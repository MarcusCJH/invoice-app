import "./styles.css";
import {
  detectDocumentType,
  validateDocument,
} from "./documents";
import { calculateTotals } from "./gst";
import { formatMoney } from "./format";
import {
  exportJson,
  importJson,
  loadState,
  nextInvoiceNumber,
  saveState,
} from "./storage";
import { docTypeLabel, renderInvoiceHtml } from "./templates/render";
import type { AppState, LineItem } from "./types";

type Tab = "profile" | "invoice";

let state: AppState = loadState();
let activeTab: Tab = "profile";

function totals() {
  return calculateTotals(state.invoice.lineItems, {
    discountExGst: state.invoice.discountExGst,
    method: state.profile.calculationMethod,
    roundCash: state.profile.roundCashToFiveCents,
  });
}

function docType() {
  return detectDocumentType(state.profile, state.invoice, totals());
}

function validationIssues() {
  return validateDocument(
    state.profile,
    state.invoice,
    docType(),
    totals(),
  );
}

// Updates only the right-hand preview and reactive labels — does NOT touch the form.
// Safe to call on every keystroke without destroying focus.
function syncPreview(): void {
  const t = totals();
  const dt = docType();
  const issues = validationIssues();
  const label = docTypeLabel(dt);

  const previewEl = document.getElementById("preview-root");
  if (previewEl) previewEl.innerHTML = renderInvoiceHtml(state);

  const previewBadge = document.getElementById("preview-badge");
  if (previewBadge) {
    previewBadge.textContent = label;
    previewBadge.className = `badge${issues.length ? " badge--warn" : ""}`;
  }

  const formBadge = document.getElementById("form-doc-type-badge");
  if (formBadge) formBadge.textContent = label;

  const summaryEl = document.getElementById("inv-summary");
  if (summaryEl) {
    summaryEl.textContent = state.profile.gstRegistered
      ? `GST: ${formatMoney(t.gstAmount)} · Total: ${formatMoney(t.totalInclGst)}`
      : `Total: ${formatMoney(t.taxableExGst)}`;
  }

  const validEl = document.getElementById("validation-container");
  if (validEl) {
    validEl.innerHTML = issues.length
      ? `<ul class="validation-list">${issues.map((i) => `<li>${esc(i.message)}</li>`).join("")}</ul>`
      : "";
  }
}

function persist(): void {
  saveState(state);
  syncPreview();
}

// Used for structural changes that alter the form DOM (adding/removing fields or items).
function persistAndRender(): void {
  saveState(state);
  render();
}

function assignInvoiceNumber(): void {
  const year = new Date().getFullYear();
  if (!state.invoice.invoiceNumber) {
    state.invoice.invoiceNumber = nextInvoiceNumber(
      state.profile.invoicePrefix,
      year,
      state.nextSequence,
    );
    state.nextSequence += 1;
  }
}

// rerender: true forces a full form rebuild (use for checkboxes that show/hide fields).
function bindInput(
  el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  get: () => string | number | boolean,
  set: (v: string | number | boolean) => void,
  rerender = false,
): void {
  el.addEventListener("input", () => {
    const raw = el.type === "checkbox" ? (el as HTMLInputElement).checked : el.value;
    if (el.type === "number") {
      set(parseFloat(el.value) || 0);
    } else if (typeof get() === "boolean") {
      set(raw as boolean);
    } else if (typeof get() === "number") {
      set(parseFloat(el.value) || 0);
    } else {
      set(raw as string);
    }
    rerender ? persistAndRender() : persist();
  });
}

function renderProfileForm(container: HTMLElement): void {
  const p = state.profile;
  container.innerHTML = `
    <div class="form-grid form-grid--2">
      <div class="field field--full">
        <label for="biz-name">Business / trading name</label>
        <input id="biz-name" type="text" value="${esc(p.name)}" />
      </div>
      <div class="field field--full">
        <label for="biz-address">Address</label>
        <textarea id="biz-address" rows="3">${esc(p.address)}</textarea>
      </div>
      <div class="field">
        <label for="biz-phone">Phone</label>
        <input id="biz-phone" type="text" value="${esc(p.phone)}" />
      </div>
      <div class="field">
        <label for="biz-email">Email</label>
        <input id="biz-email" type="email" value="${esc(p.email)}" />
      </div>
      <div class="field">
        <label for="biz-uen">UEN</label>
        <input id="biz-uen" type="text" value="${esc(p.uen)}" placeholder="e.g. 123456789A" />
      </div>
      <div class="field">
        <label for="biz-prefix">Invoice prefix</label>
        <input id="biz-prefix" type="text" value="${esc(p.invoicePrefix)}" />
      </div>
      <div class="field field--full checkbox-row">
        <input id="biz-gst-reg" type="checkbox" ${p.gstRegistered ? "checked" : ""} />
        <label for="biz-gst-reg">GST-registered business</label>
      </div>
      <div class="field ${p.gstRegistered ? "" : "hidden"}" id="gst-fields">
        <label for="biz-gst-no">GST registration number</label>
        <input id="biz-gst-no" type="text" value="${esc(p.gstRegistrationNumber)}" />
      </div>
      <div class="field ${p.gstRegistered ? "" : "hidden"}" id="gst-method-field">
        <label for="biz-calc">GST calculation method</label>
        <select id="biz-calc">
          <option value="per_line" ${p.calculationMethod === "per_line" ? "selected" : ""}>Per line item (9% each)</option>
          <option value="on_subtotal" ${p.calculationMethod === "on_subtotal" ? "selected" : ""}>On subtotal (9% once)</option>
        </select>
      </div>
      <div class="field checkbox-row ${p.gstRegistered ? "" : "hidden"}" id="cash-round-field">
        <input id="biz-cash-round" type="checkbox" ${p.roundCashToFiveCents ? "checked" : ""} />
        <label for="biz-cash-round">Round total to nearest 5¢ (cash)</label>
      </div>
      <div class="field">
        <label for="biz-bank">Bank name</label>
        <input id="biz-bank" type="text" value="${esc(p.bankName)}" />
      </div>
      <div class="field">
        <label for="biz-account">Bank account</label>
        <input id="biz-account" type="text" value="${esc(p.bankAccount)}" />
      </div>
      <div class="field field--full">
        <label for="biz-paynow">PayNow (UEN / mobile)</label>
        <input id="biz-paynow" type="text" value="${esc(p.paynow)}" />
      </div>
    </div>
  `;

  bindInput(q("#biz-name"), () => p.name, (v) => { p.name = v as string; });
  bindInput(q("#biz-address"), () => p.address, (v) => { p.address = v as string; });
  bindInput(q("#biz-phone"), () => p.phone, (v) => { p.phone = v as string; });
  bindInput(q("#biz-email"), () => p.email, (v) => { p.email = v as string; });
  bindInput(q("#biz-uen"), () => p.uen, (v) => { p.uen = v as string; });
  bindInput(q("#biz-prefix"), () => p.invoicePrefix, (v) => { p.invoicePrefix = v as string; });
  // rerender=true: toggling GST registration shows/hides fields in the form
  bindInput(q("#biz-gst-reg"), () => p.gstRegistered, (v) => { p.gstRegistered = v as boolean; }, true);
  bindInput(q("#biz-gst-no"), () => p.gstRegistrationNumber, (v) => { p.gstRegistrationNumber = v as string; });
  bindInput(q("#biz-calc"), () => p.calculationMethod, (v) => { p.calculationMethod = v as typeof p.calculationMethod; });
  bindInput(q("#biz-cash-round"), () => p.roundCashToFiveCents, (v) => { p.roundCashToFiveCents = v as boolean; });
  bindInput(q("#biz-bank"), () => p.bankName, (v) => { p.bankName = v as string; });
  bindInput(q("#biz-account"), () => p.bankAccount, (v) => { p.bankAccount = v as string; });
  bindInput(q("#biz-paynow"), () => p.paynow, (v) => { p.paynow = v as string; });
}

function renderInvoiceForm(container: HTMLElement): void {
  const inv = state.invoice;
  const t = totals();
  const dt = docType();

  container.innerHTML = `
    <p id="form-doc-type-badge" class="badge">${esc(docTypeLabel(dt))}</p>
    <div class="form-grid form-grid--2" style="margin-top: 1rem">
      <div class="field">
        <label for="inv-no">Invoice number</label>
        <div style="display:flex;gap:0.5rem">
          <input id="inv-no" type="text" value="${esc(inv.invoiceNumber)}" style="flex:1" />
          <button type="button" class="btn btn--sm" id="btn-new-no">New no.</button>
        </div>
      </div>
      <div class="field">
        <label for="inv-date">Date</label>
        <input id="inv-date" type="date" value="${esc(inv.date)}" />
      </div>
      <div class="field">
        <label for="inv-due">Due date</label>
        <input id="inv-due" type="date" value="${esc(inv.dueDate)}" />
      </div>
      <div class="field field--full">
        <label for="inv-terms">Payment terms</label>
        <input id="inv-terms" type="text" value="${esc(inv.paymentTerms)}" />
      </div>
    </div>

    <div class="form-grid form-grid--2" style="margin-top:1rem">
      <div class="field field--full checkbox-row">
        <input id="inv-credit-note" type="checkbox" ${inv.isCreditNote ? "checked" : ""} />
        <label for="inv-credit-note">This is a credit note</label>
      </div>
      ${inv.isCreditNote ? `
      <div class="field field--full">
        <label for="inv-orig-no">Original invoice number</label>
        <input id="inv-orig-no" type="text" value="${esc(inv.originalInvoiceNumber)}" placeholder="e.g. INV-2026-0001" />
      </div>` : ""}
    </div>

    <h3 style="margin:1.25rem 0 0.5rem;font-size:0.9rem">Customer</h3>
    <div class="form-grid form-grid--2">
      <div class="field">
        <label for="cust-name">Name</label>
        <input id="cust-name" type="text" value="${esc(inv.customer.name)}" />
      </div>
      <div class="field checkbox-row" style="align-self:end">
        <input id="cust-gst" type="checkbox" ${inv.customer.gstRegistered ? "checked" : ""} ${!state.profile.gstRegistered ? "disabled" : ""} />
        <label for="cust-gst">Customer is GST-registered</label>
      </div>
      <div class="field field--full">
        <label for="cust-addr">Address</label>
        <textarea id="cust-addr" rows="2">${esc(inv.customer.address)}</textarea>
      </div>
    </div>

    <h3 style="margin:1.25rem 0 0.5rem;font-size:0.9rem">Line items</h3>
    <div class="line-items" id="line-items"></div>
    <button type="button" class="btn btn--sm" id="btn-add-line" style="margin-top:0.5rem">+ Add line</button>

    <div class="form-grid form-grid--2" style="margin-top:1rem">
      <div class="field">
        <label for="inv-discount">Discount (ex GST)</label>
        <input id="inv-discount" type="number" min="0" step="0.01" value="${inv.discountExGst}" />
      </div>
      <div class="field">
        <label>Summary</label>
        <p id="inv-summary" style="margin:0.35rem 0 0;font-family:var(--mono);font-size:0.85rem">
          ${state.profile.gstRegistered
            ? `GST: ${formatMoney(t.gstAmount)} · Total: ${formatMoney(t.totalInclGst)}`
            : `Total: ${formatMoney(t.taxableExGst)}`}
        </p>
      </div>
      <div class="field field--full">
        <label for="inv-notes">Notes</label>
        <textarea id="inv-notes" rows="2">${esc(inv.notes)}</textarea>
      </div>
    </div>
  `;

  bindInput(q("#inv-no"), () => inv.invoiceNumber, (v) => { inv.invoiceNumber = v as string; });
  bindInput(q("#inv-date"), () => inv.date, (v) => { inv.date = v as string; });
  bindInput(q("#inv-due"), () => inv.dueDate, (v) => { inv.dueDate = v as string; });
  bindInput(q("#inv-terms"), () => inv.paymentTerms, (v) => { inv.paymentTerms = v as string; });
  bindInput(q("#cust-name"), () => inv.customer.name, (v) => { inv.customer.name = v as string; });
  bindInput(q("#cust-gst"), () => inv.customer.gstRegistered, (v) => { inv.customer.gstRegistered = v as boolean; });
  bindInput(q("#cust-addr"), () => inv.customer.address, (v) => { inv.customer.address = v as string; });
  bindInput(q("#inv-discount"), () => inv.discountExGst, (v) => { inv.discountExGst = v as number; });
  bindInput(q("#inv-notes"), () => inv.notes, (v) => { inv.notes = v as string; });
  // rerender=true: toggling credit note shows/hides the original invoice number field
  bindInput(q("#inv-credit-note"), () => inv.isCreditNote, (v) => { inv.isCreditNote = v as boolean; }, true);
  const origNoEl = document.querySelector<HTMLInputElement>("#inv-orig-no");
  if (origNoEl) {
    bindInput(origNoEl, () => inv.originalInvoiceNumber, (v) => { inv.originalInvoiceNumber = v as string; });
  }

  q("#btn-new-no").addEventListener("click", () => {
    const year = new Date().getFullYear();
    state.invoice.invoiceNumber = nextInvoiceNumber(
      state.profile.invoicePrefix,
      year,
      state.nextSequence,
    );
    state.nextSequence += 1;
    // Update the input value directly so we don't need a full re-render
    (q("#inv-no") as HTMLInputElement).value = state.invoice.invoiceNumber;
    persist();
  });

  const linesEl = q("#line-items");
  renderLineItems(linesEl);
  q("#btn-add-line").addEventListener("click", () => {
    inv.lineItems.push({
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unitPriceExGst: 0,
    });
    persistAndRender();
  });
}

function renderLineItems(container: HTMLElement): void {
  container.innerHTML = state.invoice.lineItems
    .map(
      (item: LineItem, i: number) => `
    <div class="line-item" data-id="${item.id}">
      <div class="field">
        <label>Description</label>
        <input type="text" data-field="desc" value="${esc(item.description)}" />
      </div>
      <div class="field">
        <label>Qty</label>
        <input type="number" data-field="qty" min="0" step="1" value="${item.quantity}" />
      </div>
      <div class="field">
        <label>Unit price ${state.profile.gstRegistered ? "(ex GST)" : ""}</label>
        <input type="number" data-field="price" min="0" step="0.01" value="${item.unitPriceExGst}" />
      </div>
      <button type="button" class="btn btn--sm btn--danger" data-remove="${i}" ${state.invoice.lineItems.length <= 1 ? "disabled" : ""}>Remove</button>
    </div>`,
    )
    .join("");

  container.querySelectorAll(".line-item").forEach((row) => {
    const id = (row as HTMLElement).dataset.id!;
    const item = state.invoice.lineItems.find((l: LineItem) => l.id === id)!;

    row.querySelector('[data-field="desc"]')?.addEventListener("input", (e) => {
      item.description = (e.target as HTMLInputElement).value;
      persist();
    });
    row.querySelector('[data-field="qty"]')?.addEventListener("input", (e) => {
      item.quantity = parseFloat((e.target as HTMLInputElement).value) || 0;
      persist();
    });
    row.querySelector('[data-field="price"]')?.addEventListener("input", (e) => {
      item.unitPriceExGst = parseFloat((e.target as HTMLInputElement).value) || 0;
      persist();
    });
    row.querySelector("[data-remove]")?.addEventListener("click", () => {
      if (state.invoice.lineItems.length > 1) {
        state.invoice.lineItems = state.invoice.lineItems.filter((l: LineItem) => l.id !== id);
        persistAndRender();
      }
    });
  });
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function q<T extends HTMLElement = HTMLElement>(sel: string): T {
  return document.querySelector(sel) as T;
}

function render(): void {
  const issues = validationIssues();
  const root = q("#app");

  root.innerHTML = `
    <header class="app-header no-print">
      <div>
        <h1>SG Invoice</h1>
        <p>Singapore small & home-based business invoicing</p>
      </div>
      <div class="header-actions">
        <button type="button" class="btn" id="btn-export">Export JSON</button>
        <label class="btn" style="cursor:pointer">
          Import JSON
          <input type="file" id="btn-import" accept=".json" class="hidden" />
        </label>
        <button type="button" class="btn btn--primary" id="btn-print">Print / PDF</button>
      </div>
    </header>

    <div class="layout layout--split">
      <section class="panel">
        <nav class="tabs no-print">
          <button type="button" class="tab ${activeTab === "profile" ? "tab--active" : ""}" data-tab="profile">Business</button>
          <button type="button" class="tab ${activeTab === "invoice" ? "tab--active" : ""}" data-tab="invoice">Invoice</button>
        </nav>
        <div class="panel__body" id="form-root"></div>
        <div id="validation-container" class="panel__body" style="padding-top:0">
          ${issues.length ? `<ul class="validation-list">${issues.map((i) => `<li>${esc(i.message)}</li>`).join("")}</ul>` : ""}
        </div>
      </section>

      <section class="panel">
        <div class="panel__header no-print">
          <h2>Preview</h2>
          <span id="preview-badge" class="badge ${issues.length ? "badge--warn" : ""}">${esc(docTypeLabel(docType()))}</span>
        </div>
        <div class="preview-pane" id="preview-root">
          ${renderInvoiceHtml(state)}
        </div>
      </section>
    </div>
  `;

  root.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTab = (btn as HTMLElement).dataset.tab as Tab;
      render();
    });
  });

  const formRoot = q("#form-root");
  if (activeTab === "profile") {
    renderProfileForm(formRoot);
  } else {
    if (!state.invoice.invoiceNumber) assignInvoiceNumber();
    renderInvoiceForm(formRoot);
  }

  q("#btn-print").addEventListener("click", () => window.print());
  q("#btn-export").addEventListener("click", () => {
    const blob = new Blob([exportJson(state)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `invoice-${state.invoice.invoiceNumber || "backup"}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
  q("#btn-import").addEventListener("change", async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const text = await file.text();
    state = importJson(text);
    persistAndRender();
  });
}

assignInvoiceNumber();
render();
