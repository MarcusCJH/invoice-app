from __future__ import annotations

from dataclasses import dataclass, field
from decimal import Decimal
from enum import Enum


class CalculationMethod(str, Enum):
    PER_LINE = "per_line"
    ON_SUBTOTAL = "on_subtotal"


@dataclass
class LineItem:
    description: str
    quantity: Decimal
    unit_price_ex_gst: Decimal

    @property
    def line_total_ex_gst(self) -> Decimal:
        return (self.quantity * self.unit_price_ex_gst).quantize(Decimal("0.01"))


@dataclass
class BusinessProfile:
    name: str = ""
    address: str = ""
    phone: str = ""
    email: str = ""
    uen: str = ""
    gst_registration_number: str = ""
    gst_registered: bool = False
    bank_name: str = ""
    bank_account: str = ""
    paynow: str = ""
    invoice_prefix: str = "INV"
    calculation_method: CalculationMethod = CalculationMethod.PER_LINE
    round_cash_to_five_cents: bool = False


@dataclass
class Customer:
    name: str = ""
    address: str = ""
    gst_registered: bool = False


@dataclass
class Invoice:
    invoice_number: str = ""
    date: str = ""
    due_date: str = ""
    payment_terms: str = "Payment due within 14 days"
    notes: str = ""
    currency: str = "SGD"
    line_items: list[LineItem] = field(default_factory=list)
    customer: Customer = field(default_factory=Customer)
    discount_ex_gst: Decimal = Decimal("0")
