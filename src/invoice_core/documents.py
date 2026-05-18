from __future__ import annotations

from decimal import Decimal
from enum import Enum
from typing import TypedDict

from invoice_core.gst import SIMPLIFIED_TAX_INVOICE_MAX, TotalsResult
from invoice_core.models import BusinessProfile, Invoice


class DocumentType(str, Enum):
    INVOICE = "invoice"
    TAX_INVOICE = "tax_invoice"
    SIMPLIFIED_TAX_INVOICE = "simplified_tax_invoice"
    RECEIPT = "receipt"
    CREDIT_NOTE = "credit_note"


class ValidationIssue(TypedDict):
    field: str
    message: str


def detect_document_type(
    profile: BusinessProfile,
    invoice: Invoice,
    totals: TotalsResult,
) -> DocumentType:
    if invoice.is_credit_note:
        return DocumentType.CREDIT_NOTE

    if not profile.gst_registered:
        return DocumentType.INVOICE

    if invoice.customer.gst_registered:
        if totals["total_incl_gst"] <= SIMPLIFIED_TAX_INVOICE_MAX:
            return DocumentType.SIMPLIFIED_TAX_INVOICE
        return DocumentType.TAX_INVOICE

    return DocumentType.RECEIPT


def document_title(doc_type: DocumentType) -> str:
    titles = {
        DocumentType.INVOICE: "INVOICE",
        DocumentType.TAX_INVOICE: "TAX INVOICE",
        DocumentType.SIMPLIFIED_TAX_INVOICE: "TAX INVOICE",
        DocumentType.RECEIPT: "RECEIPT",
        DocumentType.CREDIT_NOTE: "CREDIT NOTE",
    }
    return titles[doc_type]


def validate_document(
    profile: BusinessProfile,
    invoice: Invoice,
    doc_type: DocumentType,
    totals: TotalsResult,
) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []

    if not profile.name.strip():
        issues.append({"field": "profile.name", "message": "Business name is required."})
    if not profile.address.strip():
        issues.append({"field": "profile.address", "message": "Business address is required."})
    if not invoice.invoice_number.strip():
        issues.append({"field": "invoice_number", "message": "Invoice number is required."})
    if not invoice.date.strip():
        issues.append({"field": "date", "message": "Invoice date is required."})
    if not invoice.line_items:
        issues.append({"field": "line_items", "message": "At least one line item is required."})

    if doc_type == DocumentType.INVOICE:
        return issues

    if doc_type == DocumentType.CREDIT_NOTE:
        if not invoice.original_invoice_number.strip():
            issues.append({
                "field": "original_invoice_number",
                "message": "Original invoice number is required on a credit note.",
            })
        if profile.gst_registered and not profile.gst_registration_number.strip():
            issues.append({
                "field": "profile.gst_registration_number",
                "message": "GST registration number is required for GST documents.",
            })
        return issues

    if not profile.gst_registered:
        issues.append({
            "field": "profile.gst_registered",
            "message": "GST-registered mode requires GST registration to be enabled.",
        })
        return issues

    if not profile.gst_registration_number.strip():
        issues.append({
            "field": "profile.gst_registration_number",
            "message": "GST registration number is required for GST documents.",
        })

    if doc_type in (DocumentType.TAX_INVOICE, DocumentType.SIMPLIFIED_TAX_INVOICE):
        if not invoice.customer.name.strip():
            issues.append({"field": "customer.name", "message": "Customer name is required on a tax invoice."})
        if doc_type == DocumentType.TAX_INVOICE and not invoice.customer.address.strip():
            issues.append({
                "field": "customer.address",
                "message": "Customer address is required on a full tax invoice.",
            })

    if doc_type == DocumentType.RECEIPT:
        if totals["total_incl_gst"] <= 0:
            issues.append({"field": "total", "message": "Receipt total must be greater than zero."})

    return issues


def includes_gst_statement(doc_type: DocumentType) -> bool:
    return doc_type in (
        DocumentType.SIMPLIFIED_TAX_INVOICE,
        DocumentType.RECEIPT,
    )
