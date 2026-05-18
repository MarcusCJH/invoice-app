import { SIMPLIFIED_TAX_INVOICE_MAX } from "./gst";
import type {
  BusinessProfile,
  DocumentType,
  Invoice,
  TotalsResult,
  ValidationIssue,
} from "./types";

export function detectDocumentType(
  profile: BusinessProfile,
  invoice: Invoice,
  totals: TotalsResult,
): DocumentType {
  if (!profile.gstRegistered) {
    return "invoice";
  }
  if (invoice.customer.gstRegistered) {
    if (totals.totalInclGst <= SIMPLIFIED_TAX_INVOICE_MAX) {
      return "simplified_tax_invoice";
    }
    return "tax_invoice";
  }
  return "receipt";
}

export function documentTitle(docType: DocumentType): string {
  const titles: Record<DocumentType, string> = {
    invoice: "INVOICE",
    tax_invoice: "TAX INVOICE",
    simplified_tax_invoice: "TAX INVOICE",
    receipt: "RECEIPT",
    credit_note: "CREDIT NOTE",
  };
  return titles[docType];
}

export function includesGstStatement(docType: DocumentType): boolean {
  return docType === "simplified_tax_invoice" || docType === "receipt";
}

export function validateDocument(
  profile: BusinessProfile,
  invoice: Invoice,
  docType: DocumentType,
  totals: TotalsResult,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!profile.name.trim()) {
    issues.push({ field: "profile.name", message: "Business name is required." });
  }
  if (!profile.address.trim()) {
    issues.push({ field: "profile.address", message: "Business address is required." });
  }
  if (!invoice.invoiceNumber.trim()) {
    issues.push({ field: "invoice_number", message: "Invoice number is required." });
  }
  if (!invoice.date.trim()) {
    issues.push({ field: "date", message: "Invoice date is required." });
  }
  if (!invoice.lineItems.length) {
    issues.push({ field: "line_items", message: "At least one line item is required." });
  }

  if (docType === "invoice") {
    return issues;
  }

  if (!profile.gstRegistered) {
    issues.push({
      field: "profile.gst_registered",
      message: "GST-registered mode requires GST registration to be enabled.",
    });
    return issues;
  }

  if (!profile.gstRegistrationNumber.trim()) {
    issues.push({
      field: "profile.gst_registration_number",
      message: "GST registration number is required for GST documents.",
    });
  }

  if (docType === "tax_invoice" || docType === "simplified_tax_invoice") {
    if (!invoice.customer.name.trim()) {
      issues.push({
        field: "customer.name",
        message: "Customer name is required on a tax invoice.",
      });
    }
    if (docType === "tax_invoice" && !invoice.customer.address.trim()) {
      issues.push({
        field: "customer.address",
        message: "Customer address is required on a full tax invoice.",
      });
    }
  }

  if (docType === "receipt" && totals.totalInclGst <= 0) {
    issues.push({ field: "total", message: "Receipt total must be greater than zero." });
  }

  return issues;
}
