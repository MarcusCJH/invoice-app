import type { AppState, BusinessProfile, Invoice } from "./types";

const STORAGE_KEY = "sg-invoice-app-v1";

export const defaultProfile = (): BusinessProfile => ({
  name: "",
  address: "",
  phone: "",
  email: "",
  uen: "",
  gstRegistrationNumber: "",
  gstRegistered: false,
  bankName: "",
  bankAccount: "",
  paynow: "",
  invoicePrefix: "INV",
  calculationMethod: "per_line",
  roundCashToFiveCents: false,
  logo: "",
});

export const defaultInvoice = (): Invoice => ({
  invoiceNumber: "",
  date: new Date().toISOString().slice(0, 10),
  dueDate: "",
  paymentTerms: "Payment due within 14 days",
  notes: "",
  currency: "SGD",
  lineItems: [
    {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unitPriceExGst: 0,
    },
  ],
  customer: {
    name: "",
    address: "",
    gstRegistered: false,
  },
  discountExGst: 0,
  isCreditNote: false,
  originalInvoiceNumber: "",
});

export function defaultState(): AppState {
  return {
    profile: defaultProfile(),
    invoice: defaultInvoice(),
    nextSequence: 1,
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppState;
    return {
      ...defaultState(),
      ...parsed,
      profile: { ...defaultProfile(), ...parsed.profile },
      invoice: {
        ...defaultInvoice(),
        ...parsed.invoice,
        customer: {
          ...defaultInvoice().customer,
          ...parsed.invoice?.customer,
        },
        lineItems: parsed.invoice?.lineItems?.length
          ? parsed.invoice.lineItems
          : defaultInvoice().lineItems,
      },
    };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportJson(state: AppState): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      profile: state.profile,
      invoice: state.invoice,
      nextSequence: state.nextSequence,
    },
    null,
    2,
  );
}

export function importJson(text: string): AppState {
  const data = JSON.parse(text) as Partial<AppState> & { profile?: BusinessProfile; invoice?: Invoice };
  return {
    profile: { ...defaultProfile(), ...data.profile },
    invoice: {
      ...defaultInvoice(),
      ...data.invoice,
      customer: { ...defaultInvoice().customer, ...data.invoice?.customer },
    },
    nextSequence: data.nextSequence ?? 1,
  };
}

export function nextInvoiceNumber(prefix: string, year: number, seq: number): string {
  return `${prefix}-${year}-${String(seq).padStart(4, "0")}`;
}
