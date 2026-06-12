import { describe, expect, it } from "vitest";
import { detectDocumentType, documentTitle, includesGstStatement, validateDocument } from "../documents";
import { calculateTotals, SIMPLIFIED_TAX_INVOICE_MAX } from "../gst";
import { defaultInvoice, defaultProfile } from "../storage";
import type { BusinessProfile, Invoice } from "../types";

function profile(overrides: Partial<BusinessProfile> = {}): BusinessProfile {
  return {
    ...defaultProfile(),
    name: "Acme Pte Ltd",
    address: "1 Test Road, Singapore",
    uen: "201403121W",
    ...overrides,
  };
}

function invoice(overrides: Partial<Invoice> = {}): Invoice {
  const inv = defaultInvoice();
  return {
    ...inv,
    invoiceNumber: "INV-2026-0001",
    lineItems: [{ id: "1", description: "Consulting", quantity: 1, unitPriceExGst: 100 }],
    customer: { name: "Customer Co", address: "2 Client Ave", gstRegistered: false },
    ...overrides,
  };
}

function totalsFor(inv: Invoice, p: BusinessProfile) {
  return calculateTotals(inv.lineItems, {
    discountExGst: inv.discountExGst,
    method: p.calculationMethod,
    roundCash: p.roundCashToFiveCents,
  });
}

describe("detectDocumentType", () => {
  it("returns credit_note when the credit note flag is set", () => {
    const p = profile({ gstRegistered: true });
    const inv = invoice({ isCreditNote: true });
    expect(detectDocumentType(p, inv, totalsFor(inv, p))).toBe("credit_note");
  });

  it("returns invoice for a non-GST-registered business", () => {
    const p = profile({ gstRegistered: false });
    const inv = invoice();
    expect(detectDocumentType(p, inv, totalsFor(inv, p))).toBe("invoice");
  });

  it("returns simplified_tax_invoice for a GST customer at or under the threshold", () => {
    const p = profile({ gstRegistered: true });
    const inv = invoice({
      customer: { name: "Customer Co", address: "", gstRegistered: true },
      // 917.43 ex GST → 999.99 incl; stays under the $1,000 incl-GST threshold
      lineItems: [{ id: "1", description: "Work", quantity: 1, unitPriceExGst: 917.43 }],
    });
    const t = totalsFor(inv, p);
    expect(t.totalInclGst).toBeLessThanOrEqual(SIMPLIFIED_TAX_INVOICE_MAX);
    expect(detectDocumentType(p, inv, t)).toBe("simplified_tax_invoice");
  });

  it("returns tax_invoice for a GST customer above the threshold", () => {
    const p = profile({ gstRegistered: true });
    const inv = invoice({
      customer: { name: "Customer Co", address: "2 Client Ave", gstRegistered: true },
      lineItems: [{ id: "1", description: "Work", quantity: 1, unitPriceExGst: 2000 }],
    });
    expect(detectDocumentType(p, inv, totalsFor(inv, p))).toBe("tax_invoice");
  });

  it("returns receipt for a non-GST customer of a GST-registered business", () => {
    const p = profile({ gstRegistered: true });
    const inv = invoice();
    expect(detectDocumentType(p, inv, totalsFor(inv, p))).toBe("receipt");
  });
});

describe("documentTitle / includesGstStatement", () => {
  it("titles simplified tax invoices as TAX INVOICE", () => {
    expect(documentTitle("simplified_tax_invoice")).toBe("TAX INVOICE");
    expect(documentTitle("credit_note")).toBe("CREDIT NOTE");
  });

  it("shows the GST-inclusive statement only on simplified invoices and receipts", () => {
    expect(includesGstStatement("simplified_tax_invoice")).toBe(true);
    expect(includesGstStatement("receipt")).toBe(true);
    expect(includesGstStatement("tax_invoice")).toBe(false);
    expect(includesGstStatement("invoice")).toBe(false);
  });
});

describe("validateDocument", () => {
  it("passes a complete standard invoice", () => {
    const p = profile();
    const inv = invoice();
    expect(validateDocument(p, inv, "invoice", totalsFor(inv, p))).toEqual([]);
  });

  it("requires business name, address, invoice number, and date", () => {
    const p = profile({ name: "", address: "" });
    const inv = invoice({ invoiceNumber: "", date: "" });
    const fields = validateDocument(p, inv, "invoice", totalsFor(inv, p)).map((i) => i.field);
    expect(fields).toContain("profile.name");
    expect(fields).toContain("profile.address");
    expect(fields).toContain("invoice_number");
    expect(fields).toContain("date");
  });

  it("requires the GST registration number on tax invoices", () => {
    const p = profile({ gstRegistered: true, gstRegistrationNumber: "" });
    const inv = invoice({ customer: { name: "Customer Co", address: "2 Client Ave", gstRegistered: true } });
    const fields = validateDocument(p, inv, "tax_invoice", totalsFor(inv, p)).map((i) => i.field);
    expect(fields).toContain("profile.gst_registration_number");
  });

  it("requires customer name and address on a full tax invoice", () => {
    const p = profile({ gstRegistered: true, gstRegistrationNumber: "M90312345A" });
    const inv = invoice({ customer: { name: "", address: "", gstRegistered: true } });
    const fields = validateDocument(p, inv, "tax_invoice", totalsFor(inv, p)).map((i) => i.field);
    expect(fields).toContain("customer.name");
    expect(fields).toContain("customer.address");
  });

  it("requires only the customer name on a simplified tax invoice", () => {
    const p = profile({ gstRegistered: true, gstRegistrationNumber: "M90312345A" });
    const inv = invoice({ customer: { name: "Customer Co", address: "", gstRegistered: true } });
    expect(validateDocument(p, inv, "simplified_tax_invoice", totalsFor(inv, p))).toEqual([]);
  });

  it("requires the original invoice number on a credit note", () => {
    const p = profile();
    const inv = invoice({ isCreditNote: true, originalInvoiceNumber: "" });
    const fields = validateDocument(p, inv, "credit_note", totalsFor(inv, p)).map((i) => i.field);
    expect(fields).toContain("original_invoice_number");
  });

  it("rejects a zero-total receipt", () => {
    const p = profile({ gstRegistered: true, gstRegistrationNumber: "M90312345A" });
    const inv = invoice({ lineItems: [{ id: "1", description: "Free", quantity: 1, unitPriceExGst: 0 }] });
    const fields = validateDocument(p, inv, "receipt", totalsFor(inv, p)).map((i) => i.field);
    expect(fields).toContain("total");
  });
});
