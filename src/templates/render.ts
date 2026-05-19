import {
  detectDocumentType,
  documentTitle,
  includesGstStatement,
} from "../documents";
import { calculateTotals, lineTotalExGst, GST_RATE, SIMPLIFIED_TAX_INVOICE_MAX } from "../gst";
import { escapeHtml, formatDate, formatMoney } from "../format";
import { isMobileNumber } from "../paynow";
import type { AppState, DocumentType } from "../types";

export function renderInvoiceHtml(state: AppState, qrImages: { uen?: string; mobile?: string } = {}): string {
  const { profile, invoice } = state;
  const totals = calculateTotals(invoice.lineItems, {
    discountExGst: invoice.discountExGst,
    method: profile.calculationMethod,
    roundCash: profile.roundCashToFiveCents,
  });
  const docType = detectDocumentType(profile, invoice, totals);
  const title = documentTitle(docType);
  const showGst = profile.gstRegistered;
  const isSimplified = docType === "simplified_tax_invoice";
  const isReceipt = docType === "receipt";
  const isCreditNote = docType === "credit_note";

  const lineRows = invoice.lineItems
    .map((item) => {
      const ex = lineTotalExGst(item);
      const gst = showGst ? totals.lineGst[invoice.lineItems.indexOf(item)] ?? 0 : 0;
      const incl = showGst ? ex + gst : ex;
      if (isSimplified || isReceipt) {
        return `
        <tr>
          <td>${escapeHtml(item.description || "—").replace(/\n/g, "<br>")}</td>
          <td class="num">${item.quantity}</td>
          <td class="num">${formatMoney(incl, invoice.currency)}</td>
        </tr>`;
      }
      return `
        <tr>
          <td>${escapeHtml(item.description || "—").replace(/\n/g, "<br>")}</td>
          <td class="num">${item.quantity}</td>
          <td class="num">${formatMoney(item.unitPriceExGst, invoice.currency)}</td>
          ${showGst ? `<td class="num">${formatMoney(gst, invoice.currency)}</td>` : ""}
          <td class="num">${formatMoney(showGst ? incl : ex, invoice.currency)}</td>
        </tr>`;
    })
    .join("");

  const gstRegDisplay = profile.gstRegistrationNumber || profile.uen;

  return `
    <article class="invoice-doc" data-doc-type="${docType}">
      <header class="invoice-doc__header">
        <div class="invoice-doc__brand">
          ${profile.logo ? `<img src="${profile.logo}" class="invoice-doc__logo" alt="" />` : ""}
          <h1 class="invoice-doc__title">${title}</h1>
          ${isSimplified ? '<p class="invoice-doc__subtitle">Simplified tax invoice</p>' : ""}
        </div>
        <div class="invoice-doc__meta">
          <p><strong>No.</strong> ${escapeHtml(invoice.invoiceNumber)}</p>
          <p><strong>Date</strong> ${formatDate(invoice.date)}</p>
          ${invoice.dueDate ? `<p><strong>Due</strong> ${formatDate(invoice.dueDate)}</p>` : ""}
          ${isCreditNote && invoice.originalInvoiceNumber ? `<p><strong>Credits invoice</strong> ${escapeHtml(invoice.originalInvoiceNumber)}</p>` : ""}
        </div>
      </header>

      <section class="invoice-doc__parties">
        <div>
          <h2>From</h2>
          <p class="party-name">${escapeHtml(profile.name)}</p>
          <p class="party-address">${escapeHtml(profile.address).replace(/\n/g, "<br>")}</p>
          ${profile.phone ? `<p>${escapeHtml(profile.phone)}</p>` : ""}
          ${profile.email ? `<p>${escapeHtml(profile.email)}</p>` : ""}
          ${profile.uen ? `<p>UEN: ${escapeHtml(profile.uen)}</p>` : ""}
          ${showGst && gstRegDisplay ? `<p>GST Reg No.: ${escapeHtml(gstRegDisplay)}</p>` : ""}
        </div>
        <div>
          <h2>Bill to</h2>
          <p class="party-name">${escapeHtml(invoice.customer.name || "—")}</p>
          ${invoice.customer.address ? `<p class="party-address">${escapeHtml(invoice.customer.address).replace(/\n/g, "<br>")}</p>` : ""}
          ${invoice.customer.gstRegistered && showGst ? "<p>GST-registered customer</p>" : ""}
        </div>
      </section>

      <table class="invoice-doc__table">
        <thead>
          <tr>
            <th>Description</th>
            <th class="num">Qty</th>
            ${isSimplified || isReceipt ? '<th class="num">Amount</th>' : `
            <th class="num">Unit (ex GST)</th>
            ${showGst ? '<th class="num">GST</th>' : ""}
            <th class="num">${showGst ? "Total (incl GST)" : "Amount"}</th>`}
          </tr>
        </thead>
        <tbody>${lineRows}</tbody>
      </table>

      <section class="invoice-doc__totals">
        ${!isSimplified && !isReceipt ? `
        <div class="totals-row"><span>Subtotal (ex GST)</span><span>${formatMoney(totals.subtotalExGst, invoice.currency)}</span></div>
        ${invoice.discountExGst > 0 ? `<div class="totals-row"><span>Discount (ex GST)</span><span>−${formatMoney(totals.discountExGst, invoice.currency)}</span></div>` : ""}
        ${showGst ? `
        <div class="totals-row"><span>Taxable (ex GST)</span><span>${formatMoney(totals.taxableExGst, invoice.currency)}</span></div>
        <div class="totals-row"><span>GST @ ${GST_RATE * 100}%</span><span>${formatMoney(totals.gstAmount, invoice.currency)}</span></div>` : ""}
        ` : ""}
        <div class="totals-row totals-row--grand">
          <span>Total payable</span>
          <span>${formatMoney(showGst ? totals.totalInclGst : totals.taxableExGst, invoice.currency)}</span>
        </div>
        ${includesGstStatement(docType) ? '<p class="gst-statement">Price payable includes GST</p>' : ""}
      </section>

      ${invoice.paymentTerms ? `<p class="invoice-doc__terms">${escapeHtml(invoice.paymentTerms)}</p>` : ""}
      ${invoice.notes ? `<p class="invoice-doc__notes"><strong>Notes:</strong> ${escapeHtml(invoice.notes)}</p>` : ""}

      ${profile.bankAccount || profile.cashOnDelivery || (profile.paynowUen && profile.uen) || (profile.paynowMobile && profile.paynow && isMobileNumber(profile.paynow)) ? `
      <section class="invoice-doc__payment">
        <h2>Payment</h2>
        <div style="display:flex;gap:1.5rem;align-items:flex-start;flex-wrap:wrap">
          <div>
            ${profile.bankName ? `<p>${escapeHtml(profile.bankName)}</p>` : ""}
            ${profile.bankAccount ? `<p>Account: ${escapeHtml(profile.bankAccount)}</p>` : ""}
            ${profile.cashOnDelivery ? `<p>Cash on delivery</p>` : ""}
          </div>
          ${profile.uen && profile.paynowUen ? `
          <div style="text-align:center;flex-shrink:0">
            ${qrImages.uen ? `<img src="${qrImages.uen}" width="110" height="110" alt="PayNow QR" />` : `<canvas id="paynow-qr-uen" width="110" height="110"></canvas>`}
            <p style="margin:0.2rem 0 0;font-size:0.68rem;color:#555">PayNow (UEN)<br>${escapeHtml(profile.uen)}</p>
          </div>` : ""}
          ${profile.paynow && profile.paynowMobile && isMobileNumber(profile.paynow) ? `
          <div style="text-align:center;flex-shrink:0">
            ${qrImages.mobile ? `<img src="${qrImages.mobile}" width="110" height="110" alt="PayNow QR" />` : `<canvas id="paynow-qr-mobile" width="110" height="110"></canvas>`}
            <p style="margin:0.2rem 0 0;font-size:0.68rem;color:#555">PayNow (Mobile)<br>${escapeHtml(profile.paynow)}</p>
          </div>` : ""}
        </div>
        ${(profile.uen && profile.paynowUen) || (profile.paynow && profile.paynowMobile && isMobileNumber(profile.paynow)) ? `<p style="margin:0.5rem 0 0;font-size:0.7rem;color:#777">Scan QR with your banking app (DBS/POSB, OCBC, UOB…)</p>` : ""}
      </section>` : ""}

    </article>
  `;
}

export function docTypeLabel(docType: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    invoice: "Standard invoice",
    tax_invoice: "Full tax invoice",
    simplified_tax_invoice: `Simplified tax invoice (≤ $${SIMPLIFIED_TAX_INVOICE_MAX.toLocaleString()})`,
    receipt: "Receipt (non-GST customer)",
    credit_note: "Credit note",
  };
  return labels[docType];
}
