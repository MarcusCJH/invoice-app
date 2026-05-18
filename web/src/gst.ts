import type { CalculationMethod, LineItem, TotalsResult } from "./types";

export const GST_RATE = 0.09;
export const SIMPLIFIED_TAX_INVOICE_MAX = 1000;

export function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}

export function roundToFiveCents(value: number): number {
  return Math.round(value / 0.05) * 0.05;
}

function gstOnAmount(amountExGst: number): number {
  return roundCents(amountExGst * GST_RATE);
}

export function lineTotalExGst(item: LineItem): number {
  return roundCents(item.quantity * item.unitPriceExGst);
}

export function calculateTotals(
  lineItems: LineItem[],
  options: {
    discountExGst?: number;
    method?: CalculationMethod;
    roundCash?: boolean;
  } = {},
): TotalsResult {
  const method = options.method ?? "per_line";
  const discountExGst = roundCents(Math.max(options.discountExGst ?? 0, 0));
  const subtotalExGst = roundCents(
    lineItems.reduce((sum, item) => sum + lineTotalExGst(item), 0),
  );
  const taxableExGst = roundCents(Math.max(subtotalExGst - discountExGst, 0));

  const lineGst = lineItems.map((item) => gstOnAmount(lineTotalExGst(item)));
  let gstAmount: number;

  if (method === "per_line") {
    if (subtotalExGst > 0 && discountExGst > 0) {
      const ratio = taxableExGst / subtotalExGst;
      gstAmount = roundCents(lineGst.reduce((sum, g) => sum + g * ratio, 0));
    } else {
      gstAmount = roundCents(lineGst.reduce((sum, g) => sum + g, 0));
    }
  } else {
    gstAmount = gstOnAmount(taxableExGst);
  }

  let totalInclGst = roundCents(taxableExGst + gstAmount);
  if (options.roundCash) {
    totalInclGst = roundToFiveCents(totalInclGst);
  }

  return {
    subtotalExGst,
    discountExGst,
    taxableExGst,
    gstAmount,
    totalInclGst,
    lineGst,
  };
}
