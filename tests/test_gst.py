from decimal import Decimal

import pytest

from invoice_core.documents import DocumentType, detect_document_type, includes_gst_statement, validate_document
from invoice_core.gst import calculate_totals, round_cents, round_to_five_cents
from invoice_core.models import BusinessProfile, CalculationMethod, Customer, Invoice, LineItem


def _pen_items() -> list[LineItem]:
    """IRAS stationery example: 3 pens at $1.28 ex-GST each."""
    return [
        LineItem("Green pen", Decimal("1"), Decimal("1.28")),
        LineItem("Red pen", Decimal("1"), Decimal("1.28")),
        LineItem("Blue pen", Decimal("1"), Decimal("1.28")),
    ]


def test_per_line_gst_matches_iras_example():
    totals = calculate_totals(_pen_items(), method=CalculationMethod.PER_LINE)
    assert totals["subtotal_ex_gst"] == Decimal("3.84")
    assert totals["gst_amount"] == Decimal("0.36")
    assert totals["total_incl_gst"] == Decimal("4.20")


def test_on_subtotal_gst_matches_iras_example():
    totals = calculate_totals(_pen_items(), method=CalculationMethod.ON_SUBTOTAL)
    assert totals["subtotal_ex_gst"] == Decimal("3.84")
    assert totals["gst_amount"] == Decimal("0.35")
    assert totals["total_incl_gst"] == Decimal("4.19")


def test_round_cents():
    assert round_cents(Decimal("1.285")) == Decimal("1.29")


def test_round_to_five_cents():
    assert round_to_five_cents(Decimal("4.19")) == Decimal("4.20")
    assert round_to_five_cents(Decimal("4.17")) == Decimal("4.15")


def test_cash_rounding_on_total():
    totals = calculate_totals(
        _pen_items(),
        method=CalculationMethod.ON_SUBTOTAL,
        round_cash=True,
    )
    assert totals["total_incl_gst"] == Decimal("4.20")


def test_simplified_tax_invoice_threshold():
    profile = BusinessProfile(gst_registered=True, gst_registration_number="123456789A")
    invoice = Invoice(
        customer=Customer(name="Acme", address="1 Road", gst_registered=True),
        line_items=[LineItem("Service", Decimal("1"), Decimal("500"))],
    )
    totals = calculate_totals(invoice.line_items)
    doc = detect_document_type(profile, invoice, totals)
    assert doc == DocumentType.SIMPLIFIED_TAX_INVOICE


def test_full_tax_invoice_over_threshold():
    profile = BusinessProfile(gst_registered=True, gst_registration_number="123456789A")
    invoice = Invoice(
        customer=Customer(name="Acme", address="1 Road", gst_registered=True),
        line_items=[LineItem("Service", Decimal("1"), Decimal("2000"))],
    )
    totals = calculate_totals(invoice.line_items)
    doc = detect_document_type(profile, invoice, totals)
    assert doc == DocumentType.TAX_INVOICE


def test_receipt_for_non_gst_customer():
    profile = BusinessProfile(gst_registered=True, gst_registration_number="123456789A")
    invoice = Invoice(
        customer=Customer(name="Jane", gst_registered=False),
        line_items=[LineItem("Item", Decimal("1"), Decimal("100"))],
    )
    totals = calculate_totals(invoice.line_items)
    doc = detect_document_type(profile, invoice, totals)
    assert doc == DocumentType.RECEIPT
    assert includes_gst_statement(doc)


def test_simple_invoice_when_not_gst_registered():
    profile = BusinessProfile(gst_registered=False)
    invoice = Invoice(line_items=[LineItem("Item", Decimal("1"), Decimal("50"))])
    totals = calculate_totals(invoice.line_items)
    doc = detect_document_type(profile, invoice, totals)
    assert doc == DocumentType.INVOICE


def test_validate_tax_invoice_requires_customer_address():
    profile = BusinessProfile(
        name="Biz",
        address="1 Street",
        gst_registered=True,
        gst_registration_number="123456789A",
    )
    invoice = Invoice(
        invoice_number="INV-001",
        date="2026-05-18",
        customer=Customer(name="Acme", address="", gst_registered=True),
        line_items=[LineItem("X", Decimal("1"), Decimal("2000"))],
    )
    totals = calculate_totals(invoice.line_items)
    issues = validate_document(profile, invoice, DocumentType.TAX_INVOICE, totals)
    fields = [i["field"] for i in issues]
    assert "customer.address" in fields


def test_validate_gst_mode_mismatch():
    profile = BusinessProfile(name="Biz", address="1 St", gst_registered=False)
    invoice = Invoice(invoice_number="1", date="2026-05-18", line_items=_pen_items())
    totals = calculate_totals(invoice.line_items)
    issues = validate_document(profile, invoice, DocumentType.TAX_INVOICE, totals)
    assert any(i["field"] == "profile.gst_registered" for i in issues)
