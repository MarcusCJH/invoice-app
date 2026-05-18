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


def test_discount_scales_per_line_gst_proportionally():
    # taxable/subtotal ratio is applied to the sum of per-line GSTs
    items = [
        LineItem("A", Decimal("1"), Decimal("100")),
        LineItem("B", Decimal("1"), Decimal("200")),
    ]
    totals = calculate_totals(
        items,
        discount_ex_gst=Decimal("30"),
        method=CalculationMethod.PER_LINE,
    )
    assert totals["subtotal_ex_gst"] == Decimal("300.00")
    assert totals["taxable_ex_gst"] == Decimal("270.00")
    # line GSTs: 9.00 + 18.00 = 27.00; ratio = 270/300 = 0.9; scaled = 24.30
    assert totals["gst_amount"] == Decimal("24.30")
    assert totals["total_incl_gst"] == Decimal("294.30")


def test_discount_with_on_subtotal():
    items = [
        LineItem("A", Decimal("1"), Decimal("100")),
        LineItem("B", Decimal("1"), Decimal("200")),
    ]
    totals = calculate_totals(
        items,
        discount_ex_gst=Decimal("30"),
        method=CalculationMethod.ON_SUBTOTAL,
    )
    assert totals["taxable_ex_gst"] == Decimal("270.00")
    # round_cents(270 * 0.09) = 24.30
    assert totals["gst_amount"] == Decimal("24.30")
    assert totals["total_incl_gst"] == Decimal("294.30")


def test_per_line_and_on_subtotal_differ_with_discount():
    # Pen example with a $0.38 discount: taxable = 3.46, ratio = 3.46/3.84
    # per-line: round_cents(0.36 * ratio) = 0.32; on_subtotal: round_cents(3.46 * 0.09) = 0.31
    per_line = calculate_totals(
        _pen_items(),
        discount_ex_gst=Decimal("0.38"),
        method=CalculationMethod.PER_LINE,
    )
    on_sub = calculate_totals(
        _pen_items(),
        discount_ex_gst=Decimal("0.38"),
        method=CalculationMethod.ON_SUBTOTAL,
    )
    assert per_line["taxable_ex_gst"] == on_sub["taxable_ex_gst"] == Decimal("3.46")
    assert per_line["gst_amount"] == Decimal("0.32")
    assert on_sub["gst_amount"] == Decimal("0.31")
    assert per_line["total_incl_gst"] == Decimal("3.78")
    assert on_sub["total_incl_gst"] == Decimal("3.77")


def test_full_discount_yields_zero_gst():
    items = [LineItem("Item", Decimal("1"), Decimal("100"))]
    for method in CalculationMethod:
        totals = calculate_totals(
            items,
            discount_ex_gst=Decimal("100"),
            method=method,
        )
        assert totals["taxable_ex_gst"] == Decimal("0.00")
        assert totals["gst_amount"] == Decimal("0.00")
        assert totals["total_incl_gst"] == Decimal("0.00")


def test_excess_discount_clamped_to_zero():
    # Discount larger than subtotal must not produce negative taxable
    items = [LineItem("Item", Decimal("1"), Decimal("50"))]
    totals = calculate_totals(
        items,
        discount_ex_gst=Decimal("999"),
        method=CalculationMethod.PER_LINE,
    )
    assert totals["taxable_ex_gst"] == Decimal("0.00")
    assert totals["gst_amount"] == Decimal("0.00")
    assert totals["total_incl_gst"] == Decimal("0.00")


def test_credit_note_detected_when_flag_set():
    profile = BusinessProfile(gst_registered=True, gst_registration_number="123456789A")
    invoice = Invoice(
        is_credit_note=True,
        line_items=[LineItem("Service", Decimal("1"), Decimal("500"))],
    )
    totals = calculate_totals(invoice.line_items)
    assert detect_document_type(profile, invoice, totals) == DocumentType.CREDIT_NOTE


def test_credit_note_requires_original_invoice_number():
    profile = BusinessProfile(name="Biz", address="1 St", gst_registered=False)
    invoice = Invoice(
        invoice_number="CN-001",
        date="2026-05-18",
        is_credit_note=True,
        original_invoice_number="",
        line_items=_pen_items(),
    )
    totals = calculate_totals(invoice.line_items)
    issues = validate_document(profile, invoice, DocumentType.CREDIT_NOTE, totals)
    assert any(i["field"] == "original_invoice_number" for i in issues)


def test_credit_note_valid_with_original_invoice_number():
    profile = BusinessProfile(name="Biz", address="1 St", gst_registered=False)
    invoice = Invoice(
        invoice_number="CN-001",
        date="2026-05-18",
        is_credit_note=True,
        original_invoice_number="INV-2026-0001",
        line_items=_pen_items(),
    )
    totals = calculate_totals(invoice.line_items)
    issues = validate_document(profile, invoice, DocumentType.CREDIT_NOTE, totals)
    assert issues == []
