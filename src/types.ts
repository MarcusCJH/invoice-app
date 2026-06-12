export type CalculationMethod = "per_line" | "on_subtotal";

export type DocumentType =
  | "invoice"
  | "tax_invoice"
  | "simplified_tax_invoice"
  | "receipt"
  | "credit_note";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPriceExGst: number;
}

export interface Customer {
  name: string;
  address: string;
  gstRegistered: boolean;
}

export interface BusinessProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  uen: string;
  gstRegistrationNumber: string;
  gstRegistered: boolean;
  bankName: string;
  bankAccount: string;
  paynow: string;
  paynowUen: boolean;
  paynowMobile: boolean;
  cashOnDelivery: boolean;
  invoicePrefix: string;
  calculationMethod: CalculationMethod;
  roundCashToFiveCents: boolean;
  logo: string; // data URL, empty string = no logo
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  paymentTerms: string;
  notes: string;
  currency: string;
  lineItems: LineItem[];
  customer: Customer;
  discountExGst: number;
  isCreditNote: boolean;
  originalInvoiceNumber: string;
  isPaid: boolean;
}

export interface AppState {
  profile: BusinessProfile;
  invoice: Invoice;
  savedInvoices: Invoice[];
  nextSequence: number;
}

export interface ValidationIssue {
  field: string;
  message: string;
}

export interface TotalsResult {
  subtotalExGst: number;
  discountExGst: number;
  taxableExGst: number;
  gstAmount: number;
  totalInclGst: number;
  lineGst: number[];
}
