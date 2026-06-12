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
  paynowUen: true,
  paynowMobile: true,
  cashOnDelivery: false,
  invoicePrefix: "INV",
  calculationMethod: "per_line",
  roundCashToFiveCents: false,
  logo: "",
});

export const defaultInvoice = (): Invoice => ({
  id: crypto.randomUUID(),
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
  isPaid: false,
});

export function defaultState(): AppState {
  return {
    profile: defaultProfile(),
    invoice: defaultInvoice(),
    savedInvoices: [],
    nextSequence: 1,
  };
}

function mergeInvoice(saved: Partial<Invoice> | undefined): Invoice {
  const base = defaultInvoice();
  return {
    ...base,
    ...saved,
    customer: { ...base.customer, ...saved?.customer },
    lineItems: saved?.lineItems?.length ? saved.lineItems : base.lineItems,
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
      invoice: mergeInvoice(parsed.invoice),
      savedInvoices: Array.isArray(parsed.savedInvoices)
        ? parsed.savedInvoices.map(mergeInvoice)
        : [],
    };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    // Most likely QuotaExceededError (large logo + long history).
    return false;
  }
}

/** Snapshot the invoice into history (replace by id, newest first). */
export function upsertSavedInvoice(state: AppState, invoice: Invoice): void {
  const copy = JSON.parse(JSON.stringify(invoice)) as Invoice;
  const idx = state.savedInvoices.findIndex((inv) => inv.id === copy.id);
  if (idx >= 0) {
    state.savedInvoices[idx] = copy;
  } else {
    state.savedInvoices.unshift(copy);
  }
}

/** True if the invoice has anything worth keeping in history. */
export function invoiceHasContent(invoice: Invoice): boolean {
  return (
    invoice.lineItems.some((l) => l.description.trim() || l.unitPriceExGst > 0) ||
    !!invoice.customer.name.trim() ||
    !!invoice.notes.trim()
  );
}

export function exportJson(state: AppState): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      profile: state.profile,
      invoice: state.invoice,
      savedInvoices: state.savedInvoices,
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
    invoice: mergeInvoice(data.invoice),
    savedInvoices: Array.isArray(data.savedInvoices)
      ? data.savedInvoices.map(mergeInvoice)
      : [],
    nextSequence: data.nextSequence ?? 1,
  };
}

export function nextInvoiceNumber(prefix: string, year: number, seq: number): string {
  return `${prefix}-${year}-${String(seq).padStart(4, "0")}`;
}
