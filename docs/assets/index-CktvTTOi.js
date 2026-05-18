(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const O=.09,F=1e3;function h(i){return Math.round(i*100)/100}function M(i){return Math.round(i/.05)*.05}function R(i){return h(i*O)}function G(i){return h(i.quantity*i.unitPriceExGst)}function k(i,e={}){const t=e.method??"per_line",a=h(Math.max(e.discountExGst??0,0)),n=h(i.reduce((f,y)=>f+G(y),0)),s=h(Math.max(n-a,0)),l=i.map(f=>R(G(f)));let m;if(t==="per_line")if(n>0&&a>0){const f=s/n;m=h(l.reduce((y,b)=>y+b*f,0))}else m=h(l.reduce((f,y)=>f+y,0));else m=R(s);let u=h(s+m);return e.roundCash&&(u=M(u)),{subtotalExGst:n,discountExGst:a,taxableExGst:s,gstAmount:m,totalInclGst:u,lineGst:l}}function D(i,e,t){return i.gstRegistered?e.customer.gstRegistered?t.totalInclGst<=F?"simplified_tax_invoice":"tax_invoice":"receipt":"invoice"}function U(i){return{invoice:"INVOICE",tax_invoice:"TAX INVOICE",simplified_tax_invoice:"TAX INVOICE",receipt:"RECEIPT",credit_note:"CREDIT NOTE"}[i]}function j(i){return i==="simplified_tax_invoice"||i==="receipt"}function B(i,e,t,a){const n=[];return i.name.trim()||n.push({field:"profile.name",message:"Business name is required."}),i.address.trim()||n.push({field:"profile.address",message:"Business address is required."}),e.invoiceNumber.trim()||n.push({field:"invoice_number",message:"Invoice number is required."}),e.date.trim()||n.push({field:"date",message:"Invoice date is required."}),e.lineItems.length||n.push({field:"line_items",message:"At least one line item is required."}),t==="invoice"?n:i.gstRegistered?(i.gstRegistrationNumber.trim()||n.push({field:"profile.gst_registration_number",message:"GST registration number is required for GST documents."}),(t==="tax_invoice"||t==="simplified_tax_invoice")&&(e.customer.name.trim()||n.push({field:"customer.name",message:"Customer name is required on a tax invoice."}),t==="tax_invoice"&&!e.customer.address.trim()&&n.push({field:"customer.address",message:"Customer address is required on a full tax invoice."})),t==="receipt"&&a.totalInclGst<=0&&n.push({field:"total",message:"Receipt total must be greater than zero."}),n):(n.push({field:"profile.gst_registered",message:"GST-registered mode requires GST registration to be enabled."}),n)}function v(i,e="SGD"){return new Intl.NumberFormat("en-SG",{style:"currency",currency:e,minimumFractionDigits:2}).format(i)}function q(i){return i?new Date(i+"T12:00:00").toLocaleDateString("en-SG",{day:"2-digit",month:"short",year:"numeric"}):""}function p(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const P="sg-invoice-app-v1",I=()=>({name:"",address:"",phone:"",email:"",uen:"",gstRegistrationNumber:"",gstRegistered:!1,bankName:"",bankAccount:"",paynow:"",invoicePrefix:"INV",calculationMethod:"per_line",roundCashToFiveCents:!1}),x=()=>({invoiceNumber:"",date:new Date().toISOString().slice(0,10),dueDate:"",paymentTerms:"Payment due within 14 days",notes:"",currency:"SGD",lineItems:[{id:crypto.randomUUID(),description:"",quantity:1,unitPriceExGst:0}],customer:{name:"",address:"",gstRegistered:!1},discountExGst:0});function _(){return{profile:I(),invoice:x(),nextSequence:1}}function J(){var i,e,t;try{const a=localStorage.getItem(P);if(!a)return _();const n=JSON.parse(a);return{..._(),...n,profile:{...I(),...n.profile},invoice:{...x(),...n.invoice,customer:{...x().customer,...(i=n.invoice)==null?void 0:i.customer},lineItems:(t=(e=n.invoice)==null?void 0:e.lineItems)!=null&&t.length?n.invoice.lineItems:x().lineItems}}}catch{return _()}}function H(i){localStorage.setItem(P,JSON.stringify(i))}function V(i){return JSON.stringify({exportedAt:new Date().toISOString(),profile:i.profile,invoice:i.invoice,nextSequence:i.nextSequence},null,2)}function X(i){var t;const e=JSON.parse(i);return{profile:{...I(),...e.profile},invoice:{...x(),...e.invoice,customer:{...x().customer,...(t=e.invoice)==null?void 0:t.customer}},nextSequence:e.nextSequence??1}}function A(i,e,t){return`${i}-${e}-${String(t).padStart(4,"0")}`}function Y(i){const{profile:e,invoice:t}=i,a=k(t.lineItems,{discountExGst:t.discountExGst,method:e.calculationMethod,roundCash:e.roundCashToFiveCents}),n=D(e,t,a),s=U(n),l=e.gstRegistered,m=n==="simplified_tax_invoice",u=n==="receipt",f=t.lineItems.map(b=>{const S=G(b),w=l?a.lineGst[t.lineItems.indexOf(b)]??0:0,z=l?S+w:S;return m||u?`
        <tr>
          <td>${p(b.description||"—")}</td>
          <td class="num">${b.quantity}</td>
          <td class="num">${v(z,t.currency)}</td>
        </tr>`:`
        <tr>
          <td>${p(b.description||"—")}</td>
          <td class="num">${b.quantity}</td>
          <td class="num">${v(b.unitPriceExGst,t.currency)}</td>
          ${l?`<td class="num">${v(w,t.currency)}</td>`:""}
          <td class="num">${v(l?z:S,t.currency)}</td>
        </tr>`}).join(""),y=e.gstRegistrationNumber||e.uen;return`
    <article class="invoice-doc" data-doc-type="${n}">
      <header class="invoice-doc__header">
        <div class="invoice-doc__brand">
          <h1 class="invoice-doc__title">${s}</h1>
          ${m?'<p class="invoice-doc__subtitle">Simplified tax invoice</p>':""}
        </div>
        <div class="invoice-doc__meta">
          <p><strong>No.</strong> ${p(t.invoiceNumber)}</p>
          <p><strong>Date</strong> ${q(t.date)}</p>
          ${t.dueDate?`<p><strong>Due</strong> ${q(t.dueDate)}</p>`:""}
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
          ${l&&y?`<p>GST Reg No.: ${p(y)}</p>`:""}
        </div>
        <div>
          <h2>Bill to</h2>
          <p class="party-name">${p(t.customer.name||"—")}</p>
          ${t.customer.address?`<p class="party-address">${p(t.customer.address).replace(/\n/g,"<br>")}</p>`:""}
          ${t.customer.gstRegistered&&l?"<p>GST-registered customer</p>":""}
        </div>
      </section>

      <table class="invoice-doc__table">
        <thead>
          <tr>
            <th>Description</th>
            <th class="num">Qty</th>
            ${m||u?'<th class="num">Amount</th>':`
            <th class="num">Unit (ex GST)</th>
            ${l?'<th class="num">GST</th>':""}
            <th class="num">${l?"Total (incl GST)":"Amount"}</th>`}
          </tr>
        </thead>
        <tbody>${f}</tbody>
      </table>

      <section class="invoice-doc__totals">
        ${!m&&!u?`
        <div class="totals-row"><span>Subtotal (ex GST)</span><span>${v(a.subtotalExGst,t.currency)}</span></div>
        ${t.discountExGst>0?`<div class="totals-row"><span>Discount (ex GST)</span><span>−${v(a.discountExGst,t.currency)}</span></div>`:""}
        ${l?`
        <div class="totals-row"><span>Taxable (ex GST)</span><span>${v(a.taxableExGst,t.currency)}</span></div>
        <div class="totals-row"><span>GST @ 9%</span><span>${v(a.gstAmount,t.currency)}</span></div>`:""}
        `:""}
        <div class="totals-row totals-row--grand">
          <span>Total payable</span>
          <span>${v(l?a.totalInclGst:a.taxableExGst,t.currency)}</span>
        </div>
        ${j(n)?'<p class="gst-statement">Price payable includes GST</p>':""}
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
  `}function C(i){return{invoice:"Standard invoice",tax_invoice:"Full tax invoice",simplified_tax_invoice:"Simplified tax invoice (≤ $1,000)",receipt:"Receipt (non-GST customer)",credit_note:"Credit note"}[i]}let o=J(),$="profile";function g(){H(o),N()}function E(){return k(o.invoice.lineItems,{discountExGst:o.invoice.discountExGst,method:o.profile.calculationMethod,roundCash:o.profile.roundCashToFiveCents})}function T(){return D(o.profile,o.invoice,E())}function K(){return B(o.profile,o.invoice,T(),E())}function L(){const i=new Date().getFullYear();o.invoice.invoiceNumber||(o.invoice.invoiceNumber=A(o.profile.invoicePrefix,i,o.nextSequence),o.nextSequence+=1)}function c(i,e,t){i.addEventListener("input",()=>{const a=i.type==="checkbox"?i.checked:i.value;i.type==="number"?t(parseFloat(i.value)||0):typeof e()=="boolean"?t(a):typeof e()=="number"?t(parseFloat(i.value)||0):t(a),g()})}function Q(i){const e=o.profile;i.innerHTML=`
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
  `,c(r("#biz-name"),()=>e.name,t=>{e.name=t}),c(r("#biz-address"),()=>e.address,t=>{e.address=t}),c(r("#biz-phone"),()=>e.phone,t=>{e.phone=t}),c(r("#biz-email"),()=>e.email,t=>{e.email=t}),c(r("#biz-uen"),()=>e.uen,t=>{e.uen=t}),c(r("#biz-prefix"),()=>e.invoicePrefix,t=>{e.invoicePrefix=t}),c(r("#biz-gst-reg"),()=>e.gstRegistered,t=>{e.gstRegistered=t,g()}),c(r("#biz-gst-no"),()=>e.gstRegistrationNumber,t=>{e.gstRegistrationNumber=t}),c(r("#biz-calc"),()=>e.calculationMethod,t=>{e.calculationMethod=t}),c(r("#biz-cash-round"),()=>e.roundCashToFiveCents,t=>{e.roundCashToFiveCents=t}),c(r("#biz-bank"),()=>e.bankName,t=>{e.bankName=t}),c(r("#biz-account"),()=>e.bankAccount,t=>{e.bankAccount=t}),c(r("#biz-paynow"),()=>e.paynow,t=>{e.paynow=t})}function W(i){const e=o.invoice,t=E(),a=T();i.innerHTML=`
    <p class="badge">${d(C(a))}</p>
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

    <h3 style="margin:1.25rem 0 0.5rem;font-size:0.9rem">Customer</h3>
    <div class="form-grid form-grid--2">
      <div class="field">
        <label for="cust-name">Name</label>
        <input id="cust-name" type="text" value="${d(e.customer.name)}" />
      </div>
      <div class="field checkbox-row" style="align-self:end">
        <input id="cust-gst" type="checkbox" ${e.customer.gstRegistered?"checked":""} ${o.profile.gstRegistered?"":"disabled"} />
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
          ${o.profile.gstRegistered?`GST: ${v(t.gstAmount)} · Total: ${v(t.totalInclGst)}`:`Total: ${v(t.taxableExGst)}`}
        </p>
      </div>
      <div class="field field--full">
        <label for="inv-notes">Notes</label>
        <textarea id="inv-notes" rows="2">${d(e.notes)}</textarea>
      </div>
    </div>
  `,c(r("#inv-no"),()=>e.invoiceNumber,s=>{e.invoiceNumber=s}),c(r("#inv-date"),()=>e.date,s=>{e.date=s}),c(r("#inv-due"),()=>e.dueDate,s=>{e.dueDate=s}),c(r("#inv-terms"),()=>e.paymentTerms,s=>{e.paymentTerms=s}),c(r("#cust-name"),()=>e.customer.name,s=>{e.customer.name=s}),c(r("#cust-gst"),()=>e.customer.gstRegistered,s=>{e.customer.gstRegistered=s}),c(r("#cust-addr"),()=>e.customer.address,s=>{e.customer.address=s}),c(r("#inv-discount"),()=>e.discountExGst,s=>{e.discountExGst=s}),c(r("#inv-notes"),()=>e.notes,s=>{e.notes=s}),r("#btn-new-no").addEventListener("click",()=>{const s=new Date().getFullYear();o.invoice.invoiceNumber=A(o.profile.invoicePrefix,s,o.nextSequence),o.nextSequence+=1,g()});const n=r("#line-items");Z(n),r("#btn-add-line").addEventListener("click",()=>{e.lineItems.push({id:crypto.randomUUID(),description:"",quantity:1,unitPriceExGst:0}),g()})}function Z(i){i.innerHTML=o.invoice.lineItems.map((e,t)=>`
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
        <label>Unit price ${o.profile.gstRegistered?"(ex GST)":""}</label>
        <input type="number" data-field="price" min="0" step="0.01" value="${e.unitPriceExGst}" />
      </div>
      <button type="button" class="btn btn--sm btn--danger" data-remove="${t}" ${o.invoice.lineItems.length<=1?"disabled":""}>Remove</button>
    </div>`).join(""),i.querySelectorAll(".line-item").forEach(e=>{var n,s,l,m;const t=e.dataset.id,a=o.invoice.lineItems.find(u=>u.id===t);(n=e.querySelector('[data-field="desc"]'))==null||n.addEventListener("input",u=>{a.description=u.target.value,g()}),(s=e.querySelector('[data-field="qty"]'))==null||s.addEventListener("input",u=>{a.quantity=parseFloat(u.target.value)||0,g()}),(l=e.querySelector('[data-field="price"]'))==null||l.addEventListener("input",u=>{a.unitPriceExGst=parseFloat(u.target.value)||0,g()}),(m=e.querySelector("[data-remove]"))==null||m.addEventListener("click",()=>{o.invoice.lineItems.length>1&&(o.invoice.lineItems=o.invoice.lineItems.filter(u=>u.id!==t),g())})})}function d(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function r(i){return document.querySelector(i)}function N(){const i=K(),e=r("#app");e.innerHTML=`
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
          <button type="button" class="tab ${$==="profile"?"tab--active":""}" data-tab="profile">Business</button>
          <button type="button" class="tab ${$==="invoice"?"tab--active":""}" data-tab="invoice">Invoice</button>
        </nav>
        <div class="panel__body" id="form-root"></div>
        ${i.length?`
        <div class="panel__body" style="padding-top:0">
          <ul class="validation-list">
            ${i.map(a=>`<li>${d(a.message)}</li>`).join("")}
          </ul>
        </div>`:""}
      </section>

      <section class="panel">
        <div class="panel__header no-print">
          <h2>Preview</h2>
          <span class="badge ${i.length?"badge--warn":""}">${d(C(T()))}</span>
        </div>
        <div class="preview-pane" id="preview-root">
          ${Y(o)}
        </div>
      </section>
    </div>
  `,e.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{$=a.dataset.tab,N()})});const t=r("#form-root");$==="profile"?Q(t):(o.invoice.invoiceNumber||L(),W(t)),r("#btn-print").addEventListener("click",()=>window.print()),r("#btn-export").addEventListener("click",()=>{const a=new Blob([V(o)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(a),n.download=`invoice-${o.invoice.invoiceNumber||"backup"}.json`,n.click(),URL.revokeObjectURL(n.href)}),r("#btn-import").addEventListener("change",async a=>{var l;const n=(l=a.target.files)==null?void 0:l[0];if(!n)return;const s=await n.text();o=X(s),g()})}L();N();
