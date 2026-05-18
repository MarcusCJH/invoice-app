import type { CalculationMethod, LineItem, TotalsResult } from "./types";

export const GST_RATE = 0.09;
export const SIMPLIFIED_TAX_INVOICE_MAX = 1000;

export function roundCents(value: number): number {
  // Exponential notation avoids IEEE 754 error from `value * 100`
  // e.g. 1.005 * 100 = 100.49999... but Number("1.005e2") = 100.5
  return Number(Math.round(Number(value + "e2")) + "e-2");
}

export function roundToFiveCents(value: number): number {
  // Convert to integer cents first to avoid 0.05 representation errors
  const cents = Math.round(Number(value + "e2"));
  return Number(Math.round(cents / 5) * 5 + "e-2");
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
