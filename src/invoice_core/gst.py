from __future__ import annotations

from decimal import ROUND_HALF_UP, Decimal
from typing import TypedDict

from invoice_core.models import CalculationMethod, LineItem

GST_RATE = Decimal("0.09")
CENTS = Decimal("0.01")
FIVE_CENTS = Decimal("0.05")
SIMPLIFIED_TAX_INVOICE_MAX = Decimal("1000.00")


class TotalsResult(TypedDict):
    subtotal_ex_gst: Decimal
    discount_ex_gst: Decimal
    taxable_ex_gst: Decimal
    gst_amount: Decimal
    total_incl_gst: Decimal
    line_gst: list[Decimal]


def round_cents(value: Decimal) -> Decimal:
    return value.quantize(CENTS, rounding=ROUND_HALF_UP)


def round_to_five_cents(value: Decimal) -> Decimal:
    return (value / FIVE_CENTS).quantize(Decimal("1"), rounding=ROUND_HALF_UP) * FIVE_CENTS


def _gst_on_amount(amount_ex_gst: Decimal) -> Decimal:
    return round_cents(amount_ex_gst * GST_RATE)


def calculate_totals(
    line_items: list[LineItem],
    *,
    discount_ex_gst: Decimal = Decimal("0"),
    method: CalculationMethod = CalculationMethod.PER_LINE,
    round_cash: bool = False,
) -> TotalsResult:
    discount_ex_gst = round_cents(max(discount_ex_gst, Decimal("0")))
    subtotal_ex_gst = round_cents(sum(item.line_total_ex_gst for item in line_items))
    taxable_ex_gst = round_cents(max(subtotal_ex_gst - discount_ex_gst, Decimal("0")))

    line_gst: list[Decimal] = []
    if method == CalculationMethod.PER_LINE:
        for item in line_items:
            line_gst.append(_gst_on_amount(item.line_total_ex_gst))
        if subtotal_ex_gst > 0 and discount_ex_gst > 0:
            ratio = taxable_ex_gst / subtotal_ex_gst
            gst_amount = round_cents(sum(g * ratio for g in line_gst))
        else:
            gst_amount = round_cents(sum(line_gst))
    else:
        gst_amount = _gst_on_amount(taxable_ex_gst)
        line_gst = [
            _gst_on_amount(item.line_total_ex_gst) for item in line_items
        ]

    total_incl_gst = round_cents(taxable_ex_gst + gst_amount)
    if round_cash:
        total_incl_gst = round_to_five_cents(total_incl_gst)

    return {
        "subtotal_ex_gst": subtotal_ex_gst,
        "discount_ex_gst": discount_ex_gst,
        "taxable_ex_gst": taxable_ex_gst,
        "gst_amount": gst_amount,
        "total_incl_gst": total_incl_gst,
        "line_gst": line_gst,
    }
