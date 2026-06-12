import { describe, expect, it } from "vitest";
import {
  calculateTotals,
  GST_RATE,
  lineTotalExGst,
  roundCents,
  roundToFiveCents,
} from "../gst";
import type { LineItem } from "../types";

function item(unitPriceExGst: number, quantity = 1): LineItem {
  return { id: Math.random().toString(36), description: "test", quantity, unitPriceExGst };
}

describe("roundCents", () => {
  it("rounds to 2 decimal places", () => {
    expect(roundCents(1.234)).toBe(1.23);
    expect(roundCents(1.236)).toBe(1.24);
    expect(roundCents(0)).toBe(0);
  });

  it("avoids IEEE 754 errors on .005 boundaries", () => {
    // 1.005 * 100 === 100.49999... in floating point; naive rounding gives 1.00
    expect(roundCents(1.005)).toBe(1.01);
    expect(roundCents(2.675)).toBe(2.68);
  });
});

describe("roundToFiveCents", () => {
  it("rounds to the nearest 5 cents", () => {
    expect(roundToFiveCents(0.07)).toBe(0.05);
    expect(roundToFiveCents(0.08)).toBe(0.1);
    expect(roundToFiveCents(0.1)).toBe(0.1);
    expect(roundToFiveCents(11.03)).toBe(11.05);
    expect(roundToFiveCents(11.02)).toBe(11.0);
  });
});

describe("lineTotalExGst", () => {
  it("multiplies quantity by unit price and rounds", () => {
    expect(lineTotalExGst(item(10.5, 3))).toBe(31.5);
    expect(lineTotalExGst(item(0.333, 3))).toBe(1.0);
  });
});

describe("calculateTotals", () => {
  it("uses the current 9% GST rate", () => {
    expect(GST_RATE).toBe(0.09);
  });

  it("computes per-line GST as the sum of rounded line GSTs", () => {
    // 3 lines of $10.05: per-line GST = round(0.9045) = 0.90 each → 2.70
    const t = calculateTotals([item(10.05), item(10.05), item(10.05)], { method: "per_line" });
    expect(t.subtotalExGst).toBe(30.15);
    expect(t.lineGst).toEqual([0.9, 0.9, 0.9]);
    expect(t.gstAmount).toBe(2.7);
    expect(t.totalInclGst).toBe(32.85);
  });

  it("computes on-subtotal GST once on the taxable amount", () => {
    // Same lines: 30.15 * 0.09 = 2.7135 → 2.71 (differs from per-line)
    const t = calculateTotals([item(10.05), item(10.05), item(10.05)], { method: "on_subtotal" });
    expect(t.gstAmount).toBe(2.71);
    expect(t.totalInclGst).toBe(32.86);
  });

  it("scales per-line GST proportionally when a discount applies", () => {
    const t = calculateTotals([item(100), item(200)], {
      method: "per_line",
      discountExGst: 30,
    });
    expect(t.subtotalExGst).toBe(300);
    expect(t.taxableExGst).toBe(270);
    // lineGst [9, 18] scaled by 270/300 = 0.9 → 24.30
    expect(t.gstAmount).toBe(24.3);
    expect(t.totalInclGst).toBe(294.3);
  });

  it("clamps negative discounts to zero", () => {
    const t = calculateTotals([item(100)], { discountExGst: -50 });
    expect(t.discountExGst).toBe(0);
    expect(t.taxableExGst).toBe(100);
  });

  it("clamps the taxable amount to zero when discount exceeds subtotal", () => {
    const t = calculateTotals([item(100)], { discountExGst: 150 });
    expect(t.taxableExGst).toBe(0);
    expect(t.totalInclGst).toBe(0);
  });

  it("applies 5-cent cash rounding to the final total only", () => {
    // 10.12 → GST 0.91 → 11.03 → cash-rounded to 11.05
    const t = calculateTotals([item(10.12)], { method: "per_line", roundCash: true });
    expect(t.gstAmount).toBe(0.91);
    expect(t.totalInclGst).toBe(11.05);
  });

  it("returns all zeroes for an empty item list", () => {
    const t = calculateTotals([]);
    expect(t.subtotalExGst).toBe(0);
    expect(t.gstAmount).toBe(0);
    expect(t.totalInclGst).toBe(0);
  });
});
