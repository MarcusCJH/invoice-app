(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(n){if(n.ep)return;n.ep=!0;const l=t(n);fetch(n.href,l)}})();const C=.09,D=1e3;function g(i){return+(Math.round(+(i+"e2"))+"e-2")}function U(i){const e=Math.round(+(i+"e2"));return+(Math.round(e/5)*5+"e-2")}function q(i){return g(i*C)}function I(i){return g(i.quantity*i.unitPriceExGst)}function P(i,e={}){const t=e.method??"per_line",o=g(Math.max(e.discountExGst??0,0)),n=g(i.reduce((f,h)=>f+I(h),0)),l=g(Math.max(n-o,0)),s=i.map(f=>q(I(f)));let m;if(t==="per_line")if(n>0&&o>0){const f=l/n;m=g(s.reduce((h,$)=>h+$*f,0))}else m=g(s.reduce((f,h)=>f+h,0));else m=q(l);let u=g(l+m);return e.roundCash&&(u=U(u)),{subtotalExGst:n,discountExGst:o,taxableExGst:l,gstAmount:m,totalInclGst:u,lineGst:s}}function A(i,e,t){return e.isCreditNote?"credit_note":i.gstRegistered?e.customer.gstRegistered?t.totalInclGst<=D?"simplified_tax_invoice":"tax_invoice":"receipt":"invoice"}function j(i){return{invoice:"INVOICE",tax_invoice:"TAX INVOICE",simplified_tax_invoice:"TAX INVOICE",receipt:"RECEIPT",credit_note:"CREDIT NOTE"}[i]}function B(i){return i==="simplified_tax_invoice"||i==="receipt"}function J(i,e,t,o){const n=[];return i.name.trim()||n.push({field:"profile.name",message:"Business name is required."}),i.address.trim()||n.push({field:"profile.address",message:"Business address is required."}),e.invoiceNumber.trim()||n.push({field:"invoice_number",message:"Invoice number is required."}),e.date.trim()||n.push({field:"date",message:"Invoice date is required."}),e.lineItems.length||n.push({field:"line_items",message:"At least one line item is required."}),t==="invoice"?n:t==="credit_note"?(e.originalInvoiceNumber.trim()||n.push({field:"original_invoice_number",message:"Original invoice number is required on a credit note."}),i.gstRegistered&&!i.gstRegistrationNumber.trim()&&n.push({field:"profile.gst_registration_number",message:"GST registration number is required for GST documents."}),n):i.gstRegistered?(i.gstRegistrationNumber.trim()||n.push({field:"profile.gst_registration_number",message:"GST registration number is required for GST documents."}),(t==="tax_invoice"||t==="simplified_tax_invoice")&&(e.customer.name.trim()||n.push({field:"customer.name",message:"Customer name is required on a tax invoice."}),t==="tax_invoice"&&!e.customer.address.trim()&&n.push({field:"customer.address",message:"Customer address is required on a full tax invoice."})),t==="receipt"&&o.totalInclGst<=0&&n.push({field:"total",message:"Receipt total must be greater than zero."}),n):(n.push({field:"profile.gst_registered",message:"GST-registered mode requires GST registration to be enabled."}),n)}function v(i,e="SGD"){return new Intl.NumberFormat("en-SG",{style:"currency",currency:e,minimumFractionDigits:2}).format(i)}function k(i){return i?new Date(i+"T12:00:00").toLocaleDateString("en-SG",{day:"2-digit",month:"short",year:"numeric"}):""}function p(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const L="sg-invoice-app-v1",G=()=>({name:"",address:"",phone:"",email:"",uen:"",gstRegistrationNumber:"",gstRegistered:!1,bankName:"",bankAccount:"",paynow:"",invoicePrefix:"INV",calculationMethod:"per_line",roundCashToFiveCents:!1}),x=()=>({invoiceNumber:"",date:new Date().toISOString().slice(0,10),dueDate:"",paymentTerms:"Payment due within 14 days",notes:"",currency:"SGD",lineItems:[{id:crypto.randomUUID(),description:"",quantity:1,unitPriceExGst:0}],customer:{name:"",address:"",gstRegistered:!1},discountExGst:0,isCreditNote:!1,originalInvoiceNumber:""});function _(){return{profile:G(),invoice:x(),nextSequence:1}}function H(){var i,e,t;try{const o=localStorage.getItem(L);if(!o)return _();const n=JSON.parse(o);return{..._(),...n,profile:{...G(),...n.profile},invoice:{...x(),...n.invoice,customer:{...x().customer,...(i=n.invoice)==null?void 0:i.customer},lineItems:(t=(e=n.invoice)==null?void 0:e.lineItems)!=null&&t.length?n.invoice.lineItems:x().lineItems}}}catch{return _()}}function V(i){localStorage.setItem(L,JSON.stringify(i))}function X(i){return JSON.stringify({exportedAt:new Date().toISOString(),profile:i.profile,invoice:i.invoice,nextSequence:i.nextSequence},null,2)}function Y(i){var t;const e=JSON.parse(i);return{profile:{...G(),...e.profile},invoice:{...x(),...e.invoice,customer:{...x().customer,...(t=e.invoice)==null?void 0:t.customer}},nextSequence:e.nextSequence??1}}function O(i,e,t){return`${i}-${e}-${String(t).padStart(4,"0")}`}function K(i){const{profile:e,invoice:t}=i,o=P(t.lineItems,{discountExGst:t.discountExGst,method:e.calculationMethod,roundCash:e.roundCashToFiveCents}),n=A(e,t,o),l=j(n),s=e.gstRegistered,m=n==="simplified_tax_invoice",u=n==="receipt",f=n==="credit_note",h=t.lineItems.map(y=>{const N=I(y),R=s?o.lineGst[t.lineItems.indexOf(y)]??0:0,z=s?N+R:N;return m||u?`
        <tr>
          <td>${p(y.description||"—")}</td>
          <td class="num">${y.quantity}</td>
          <td class="num">${v(z,t.currency)}</td>
        </tr>`:`
        <tr>
          <td>${p(y.description||"—")}</td>
          <td class="num">${y.quantity}</td>
          <td class="num">${v(y.unitPriceExGst,t.currency)}</td>
          ${s?`<td class="num">${v(R,t.currency)}</td>`:""}
          <td class="num">${v(s?z:N,t.currency)}</td>
        </tr>`}).join(""),$=e.gstRegistrationNumber||e.uen;return`
    <article class="invoice-doc" data-doc-type="${n}">
      <header class="invoice-doc__header">
        <div class="invoice-doc__brand">
          <h1 class="invoice-doc__title">${l}</h1>
          ${m?'<p class="invoice-doc__subtitle">Simplified tax invoice</p>':""}
        </div>
        <div class="invoice-doc__meta">
          <p><strong>No.</strong> ${p(t.invoiceNumber)}</p>
          <p><strong>Date</strong> ${k(t.date)}</p>
          ${t.dueDate?`<p><strong>Due</strong> ${k(t.dueDate)}</p>`:""}
          ${f&&t.originalInvoiceNumber?`<p><strong>Credits invoice</strong> ${p(t.originalInvoiceNumber)}</p>`:""}
        </div>
      </header>

      <section class="invoice-doc__parties">
        <div>
          <h2>From</h2>
          <p class="party-name">${p(e.name)}</p>
          <p class="party-address">${p(e.address).replace(/\n/g,"<br>")}</p>
          ${e.phone?`<p>${p(e.phone)}</p>`:""}
          ${e.email?`<p>${p(e.email)}</p>`:""}
          ${e.uen?`<p>UEN: ${p(e.uen)}</p>`:""}
          ${s&&$?`<p>GST Reg No.: ${p($)}</p>`:""}
        </div>
        <div>
          <h2>Bill to</h2>
          <p class="party-name">${p(t.customer.name||"—")}</p>
          ${t.customer.address?`<p class="party-address">${p(t.customer.address).replace(/\n/g,"<br>")}</p>`:""}
          ${t.customer.gstRegistered&&s?"<p>GST-registered customer</p>":""}
        </div>
      </section>

      <table class="invoice-doc__table">
        <thead>
          <tr>
            <th>Description</th>
            <th class="num">Qty</th>
            ${m||u?'<th class="num">Amount</th>':`
            <th class="num">Unit (ex GST)</th>
            ${s?'<th class="num">GST</th>':""}
            <th class="num">${s?"Total (incl GST)":"Amount"}</th>`}
          </tr>
        </thead>
        <tbody>${h}</tbody>
      </table>

      <section class="invoice-doc__totals">
        ${!m&&!u?`
        <div class="totals-row"><span>Subtotal (ex GST)</span><span>${v(o.subtotalExGst,t.currency)}</span></div>
        ${t.discountExGst>0?`<div class="totals-row"><span>Discount (ex GST)</span><span>−${v(o.discountExGst,t.currency)}</span></div>`:""}
        ${s?`
        <div class="totals-row"><span>Taxable (ex GST)</span><span>${v(o.taxableExGst,t.currency)}</span></div>
        <div class="totals-row"><span>GST @ ${C*100}%</span><span>${v(o.gstAmount,t.currency)}</span></div>`:""}
        `:""}
        <div class="totals-row totals-row--grand">
          <span>Total payable</span>
          <span>${v(s?o.totalInclGst:o.taxableExGst,t.currency)}</span>
        </div>
        ${B(n)?'<p class="gst-statement">Price payable includes GST</p>':""}
      </section>

      ${t.paymentTerms?`<p class="invoice-doc__terms">${p(t.paymentTerms)}</p>`:""}
      ${t.notes?`<p class="invoice-doc__notes"><strong>Notes:</strong> ${p(t.notes)}</p>`:""}

      ${e.bankAccount||e.paynow?`
      <section class="invoice-doc__payment">
        <h2>Payment</h2>
        ${e.bankName?`<p>${p(e.bankName)}</p>`:""}
        ${e.bankAccount?`<p>Account: ${p(e.bankAccount)}</p>`:""}
        ${e.paynow?`<p>PayNow: ${p(e.paynow)}</p>`:""}
      </section>`:""}

      <footer class="invoice-doc__footer">
        <p>For record-keeping assistance only. Not tax or legal advice. Confirm requirements with IRAS or your accountant.</p>
      </footer>
    </article>
  `}function F(i){return{invoice:"Standard invoice",tax_invoice:"Full tax invoice",simplified_tax_invoice:`Simplified tax invoice (≤ $${D.toLocaleString()})`,receipt:"Receipt (non-GST customer)",credit_note:"Credit note"}[i]}let a=H(),S="profile";function b(){V(a),w()}function E(){return P(a.invoice.lineItems,{discountExGst:a.invoice.discountExGst,method:a.profile.calculationMethod,roundCash:a.profile.roundCashToFiveCents})}function T(){return A(a.profile,a.invoice,E())}function Q(){return J(a.profile,a.invoice,T(),E())}function M(){const i=new Date().getFullYear();a.invoice.invoiceNumber||(a.invoice.invoiceNumber=O(a.profile.invoicePrefix,i,a.nextSequence),a.nextSequence+=1)}function c(i,e,t){i.addEventListener("input",()=>{const o=i.type==="checkbox"?i.checked:i.value;i.type==="number"?t(parseFloat(i.value)||0):typeof e()=="boolean"?t(o):typeof e()=="number"?t(parseFloat(i.value)||0):t(o),b()})}function W(i){const e=a.profile;i.innerHTML=`
    <div class="form-grid form-grid--2">
      <div class="field field--full">
        <label for="biz-name">Business / trading name</label>
        <input id="biz-name" type="text" value="${d(e.name)}" />
      </div>
      <div class="field field--full">
        <label for="biz-address">Address</label>
        <textarea id="biz-address" rows="3">${d(e.address)}</textarea>
      </div>
      <div class="field">
        <label for="biz-phone">Phone</label>
        <input id="biz-phone" type="text" value="${d(e.phone)}" />
      </div>
      <div class="field">
        <label for="biz-email">Email</label>
        <input id="biz-email" type="email" value="${d(e.email)}" />
      </div>
      <div class="field">
        <label for="biz-uen">UEN</label>
        <input id="biz-uen" type="text" value="${d(e.uen)}" placeholder="e.g. 123456789A" />
      </div>
      <div class="field">
        <label for="biz-prefix">Invoice prefix</label>
        <input id="biz-prefix" type="text" value="${d(e.invoicePrefix)}" />
      </div>
      <div class="field field--full checkbox-row">
        <input id="biz-gst-reg" type="checkbox" ${e.gstRegistered?"checked":""} />
        <label for="biz-gst-reg">GST-registered business</label>
      </div>
      <div class="field ${e.gstRegistered?"":"hidden"}" id="gst-fields">
        <label for="biz-gst-no">GST registration number</label>
        <input id="biz-gst-no" type="text" value="${d(e.gstRegistrationNumber)}" />
      </div>
      <div class="field ${e.gstRegistered?"":"hidden"}" id="gst-method-field">
        <label for="biz-calc">GST calculation method</label>
        <select id="biz-calc">
          <option value="per_line" ${e.calculationMethod==="per_line"?"selected":""}>Per line item (9% each)</option>
          <option value="on_subtotal" ${e.calculationMethod==="on_subtotal"?"selected":""}>On subtotal (9% once)</option>
        </select>
      </div>
      <div class="field checkbox-row ${e.gstRegistered?"":"hidden"}" id="cash-round-field">
        <input id="biz-cash-round" type="checkbox" ${e.roundCashToFiveCents?"checked":""} />
        <label for="biz-cash-round">Round total to nearest 5¢ (cash)</label>
      </div>
      <div class="field">
        <label for="biz-bank">Bank name</label>
        <input id="biz-bank" type="text" value="${d(e.bankName)}" />
      </div>
      <div class="field">
        <label for="biz-account">Bank account</label>
        <input id="biz-account" type="text" value="${d(e.bankAccount)}" />
      </div>
      <div class="field field--full">
        <label for="biz-paynow">PayNow (UEN / mobile)</label>
        <input id="biz-paynow" type="text" value="${d(e.paynow)}" />
      </div>
    </div>
  `,c(r("#biz-name"),()=>e.name,t=>{e.name=t}),c(r("#biz-address"),()=>e.address,t=>{e.address=t}),c(r("#biz-phone"),()=>e.phone,t=>{e.phone=t}),c(r("#biz-email"),()=>e.email,t=>{e.email=t}),c(r("#biz-uen"),()=>e.uen,t=>{e.uen=t}),c(r("#biz-prefix"),()=>e.invoicePrefix,t=>{e.invoicePrefix=t}),c(r("#biz-gst-reg"),()=>e.gstRegistered,t=>{e.gstRegistered=t,b()}),c(r("#biz-gst-no"),()=>e.gstRegistrationNumber,t=>{e.gstRegistrationNumber=t}),c(r("#biz-calc"),()=>e.calculationMethod,t=>{e.calculationMethod=t}),c(r("#biz-cash-round"),()=>e.roundCashToFiveCents,t=>{e.roundCashToFiveCents=t}),c(r("#biz-bank"),()=>e.bankName,t=>{e.bankName=t}),c(r("#biz-account"),()=>e.bankAccount,t=>{e.bankAccount=t}),c(r("#biz-paynow"),()=>e.paynow,t=>{e.paynow=t})}function Z(i){const e=a.invoice,t=E(),o=T();i.innerHTML=`
    <p class="badge">${d(F(o))}</p>
    <div class="form-grid form-grid--2" style="margin-top: 1rem">
      <div class="field">
        <label for="inv-no">Invoice number</label>
        <div style="display:flex;gap:0.5rem">
          <input id="inv-no" type="text" value="${d(e.invoiceNumber)}" style="flex:1" />
          <button type="button" class="btn btn--sm" id="btn-new-no">New no.</button>
        </div>
      </div>
      <div class="field">
        <label for="inv-date">Date</label>
        <input id="inv-date" type="date" value="${d(e.date)}" />
      </div>
      <div class="field">
        <label for="inv-due">Due date</label>
        <input id="inv-due" type="date" value="${d(e.dueDate)}" />
      </div>
      <div class="field field--full">
        <label for="inv-terms">Payment terms</label>
        <input id="inv-terms" type="text" value="${d(e.paymentTerms)}" />
      </div>
    </div>

    <div class="form-grid form-grid--2" style="margin-top:1rem">
      <div class="field field--full checkbox-row">
        <input id="inv-credit-note" type="checkbox" ${e.isCreditNote?"checked":""} />
        <label for="inv-credit-note">This is a credit note</label>
      </div>
      ${e.isCreditNote?`
      <div class="field field--full">
        <label for="inv-orig-no">Original invoice number</label>
        <input id="inv-orig-no" type="text" value="${d(e.originalInvoiceNumber)}" placeholder="e.g. INV-2026-0001" />
      </div>`:""}
    </div>

    <h3 style="margin:1.25rem 0 0.5rem;font-size:0.9rem">Customer</h3>
    <div class="form-grid form-grid--2">
      <div class="field">
        <label for="cust-name">Name</label>
        <input id="cust-name" type="text" value="${d(e.customer.name)}" />
      </div>
      <div class="field checkbox-row" style="align-self:end">
        <input id="cust-gst" type="checkbox" ${e.customer.gstRegistered?"checked":""} ${a.profile.gstRegistered?"":"disabled"} />
        <label for="cust-gst">Customer is GST-registered</label>
      </div>
      <div class="field field--full">
        <label for="cust-addr">Address</label>
        <textarea id="cust-addr" rows="2">${d(e.customer.address)}</textarea>
      </div>
    </div>

    <h3 style="margin:1.25rem 0 0.5rem;font-size:0.9rem">Line items</h3>
    <div class="line-items" id="line-items"></div>
    <button type="button" class="btn btn--sm" id="btn-add-line" style="margin-top:0.5rem">+ Add line</button>

    <div class="form-grid form-grid--2" style="margin-top:1rem">
      <div class="field">
        <label for="inv-discount">Discount (ex GST)</label>
        <input id="inv-discount" type="number" min="0" step="0.01" value="${e.discountExGst}" />
      </div>
      <div class="field">
        <label>Summary</label>
        <p style="margin:0.35rem 0 0;font-family:var(--mono);font-size:0.85rem">
          ${a.profile.gstRegistered?`GST: ${v(t.gstAmount)} · Total: ${v(t.totalInclGst)}`:`Total: ${v(t.taxableExGst)}`}
        </p>
      </div>
      <div class="field field--full">
        <label for="inv-notes">Notes</label>
        <textarea id="inv-notes" rows="2">${d(e.notes)}</textarea>
      </div>
    </div>
  `,c(r("#inv-no"),()=>e.invoiceNumber,s=>{e.invoiceNumber=s}),c(r("#inv-date"),()=>e.date,s=>{e.date=s}),c(r("#inv-due"),()=>e.dueDate,s=>{e.dueDate=s}),c(r("#inv-terms"),()=>e.paymentTerms,s=>{e.paymentTerms=s}),c(r("#cust-name"),()=>e.customer.name,s=>{e.customer.name=s}),c(r("#cust-gst"),()=>e.customer.gstRegistered,s=>{e.customer.gstRegistered=s}),c(r("#cust-addr"),()=>e.customer.address,s=>{e.customer.address=s}),c(r("#inv-discount"),()=>e.discountExGst,s=>{e.discountExGst=s}),c(r("#inv-notes"),()=>e.notes,s=>{e.notes=s}),c(r("#inv-credit-note"),()=>e.isCreditNote,s=>{e.isCreditNote=s});const n=document.querySelector("#inv-orig-no");n&&c(n,()=>e.originalInvoiceNumber,s=>{e.originalInvoiceNumber=s}),r("#btn-new-no").addEventListener("click",()=>{const s=new Date().getFullYear();a.invoice.invoiceNumber=O(a.profile.invoicePrefix,s,a.nextSequence),a.nextSequence+=1,b()});const l=r("#line-items");ee(l),r("#btn-add-line").addEventListener("click",()=>{e.lineItems.push({id:crypto.randomUUID(),description:"",quantity:1,unitPriceExGst:0}),b()})}function ee(i){i.innerHTML=a.invoice.lineItems.map((e,t)=>`
    <div class="line-item" data-id="${e.id}">
      <div class="field">
        <label>Description</label>
        <input type="text" data-field="desc" value="${d(e.description)}" />
      </div>
      <div class="field">
        <label>Qty</label>
        <input type="number" data-field="qty" min="0" step="1" value="${e.quantity}" />
      </div>
      <div class="field">
        <label>Unit price ${a.profile.gstRegistered?"(ex GST)":""}</label>
        <input type="number" data-field="price" min="0" step="0.01" value="${e.unitPriceExGst}" />
      </div>
      <button type="button" class="btn btn--sm btn--danger" data-remove="${t}" ${a.invoice.lineItems.length<=1?"disabled":""}>Remove</button>
    </div>`).join(""),i.querySelectorAll(".line-item").forEach(e=>{var n,l,s,m;const t=e.dataset.id,o=a.invoice.lineItems.find(u=>u.id===t);(n=e.querySelector('[data-field="desc"]'))==null||n.addEventListener("input",u=>{o.description=u.target.value,b()}),(l=e.querySelector('[data-field="qty"]'))==null||l.addEventListener("input",u=>{o.quantity=parseFloat(u.target.value)||0,b()}),(s=e.querySelector('[data-field="price"]'))==null||s.addEventListener("input",u=>{o.unitPriceExGst=parseFloat(u.target.value)||0,b()}),(m=e.querySelector("[data-remove]"))==null||m.addEventListener("click",()=>{a.invoice.lineItems.length>1&&(a.invoice.lineItems=a.invoice.lineItems.filter(u=>u.id!==t),b())})})}function d(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function r(i){return document.querySelector(i)}function w(){const i=Q(),e=r("#app");e.innerHTML=`
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
          <button type="button" class="tab ${S==="profile"?"tab--active":""}" data-tab="profile">Business</button>
          <button type="button" class="tab ${S==="invoice"?"tab--active":""}" data-tab="invoice">Invoice</button>
        </nav>
        <div class="panel__body" id="form-root"></div>
        ${i.length?`
        <div class="panel__body" style="padding-top:0">
          <ul class="validation-list">
            ${i.map(o=>`<li>${d(o.message)}</li>`).join("")}
          </ul>
        </div>`:""}
      </section>

      <section class="panel">
        <div class="panel__header no-print">
          <h2>Preview</h2>
          <span class="badge ${i.length?"badge--warn":""}">${d(F(T()))}</span>
        </div>
        <div class="preview-pane" id="preview-root">
          ${K(a)}
        </div>
      </section>
    </div>
  `,e.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{S=o.dataset.tab,w()})});const t=r("#form-root");S==="profile"?W(t):(a.invoice.invoiceNumber||M(),Z(t)),r("#btn-print").addEventListener("click",()=>window.print()),r("#btn-export").addEventListener("click",()=>{const o=new Blob([X(a)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(o),n.download=`invoice-${a.invoice.invoiceNumber||"backup"}.json`,n.click(),URL.revokeObjectURL(n.href)}),r("#btn-import").addEventListener("change",async o=>{var s;const n=(s=o.target.files)==null?void 0:s[0];if(!n)return;const l=await n.text();a=Y(l),b()})}M();w();
