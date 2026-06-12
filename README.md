# SG Invoice

A Singapore-focused invoice web app for small and home-based businesses. Create standard invoices, tax invoices, simplified tax invoices, receipts, and credit notes with GST calculations aligned to IRAS guidance. Runs entirely in the browser — ideal for [GitHub Pages](https://pages.github.com/) hosting.

## Features

- **Business profile** — name, address, UEN, GST registration, bank / PayNow details, logo
- **GST modes** — not GST-registered (standard invoice) or GST-registered (tax invoice / simplified / receipt)
- **Auto document type** — picks the right layout based on GST status and customer
- **Credit notes** — reference an original invoice number, flip amounts to negative
- **Line items** — quantity, unit price (ex-GST when registered), per-line discounts
- **GST @ 9%** — per-line or on-subtotal calculation (both IRAS-accepted)
- **PayNow QR codes** — generated from UEN or mobile number, pre-filled with invoice total
- **Invoice history** — past invoices are saved automatically (on print, new invoice, or open); reopen, duplicate for recurring clients, or delete
- **Paid stamp** — mark an invoice as paid to add a "Paid" stamp and switch wording to "Total paid"
- **Dark / light theme** — persisted in `localStorage`
- **Live preview** — print or save as PDF via the browser
- **Local storage** — data stays on your device; export / import JSON backup (includes history)

## Quick start

```bash
npm install
npm run dev      # dev server with hot reload
npm test         # unit tests (Vitest)
```

Open http://localhost:5173

### Build for GitHub Pages

```bash
# Replace invoice-app with your repository name
$env:VITE_BASE="/invoice-app/"   # PowerShell
# export VITE_BASE=/invoice-app/   # macOS/Linux
npm run build
```

Output is written to `docs/` at the repo root.

## Deploy to GitHub Pages

### Option A — Deploy from `/docs` folder (simple)

1. Run the build above with `VITE_BASE=/your-repo-name/`
2. Commit the `docs/` folder
3. In the repo **Settings → Pages**, set source to **main** branch, **/docs** folder

### Option B — GitHub Actions (automatic)

1. Enable **Settings → Pages → Build and deployment → GitHub Actions**
2. Push to `main`; the workflow in [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds and deploys

The workflow sets `VITE_BASE` from your repository name automatically.

## Singapore invoicing notes

This app helps with **record-keeping and formatting**. It is not tax or legal advice.

| Situation | Document |
|-----------|----------|
| Not GST-registered | Standard **invoice** |
| GST-registered, GST-registered customer, total > $1,000 incl. GST | Full **tax invoice** |
| GST-registered, GST-registered customer, total ≤ $1,000 incl. GST | **Simplified tax invoice** |
| GST-registered, customer not GST-registered | **Receipt** (with "Price payable includes GST") |
| Reversing a previously issued invoice | **Credit note** |

**GST registration** is generally required when taxable turnover exceeds **$1 million** (see [IRAS — Do I need to register for GST](https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/gst-registration-deregistration/do-i-need-to-register-for-gst)).

**InvoiceNow:** GST-registered businesses must eventually transmit invoice data via InvoiceNow-Ready solutions (phased from 2025–2029). This static app does **not** submit to IRAS; plan a certified Peppol/InvoiceNow provider when required. See [GST InvoiceNow Requirement](https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/gst-invoicenow-requirement).

**References**

- [IRAS — Invoicing customers](https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/basics-of-gst/invoicing-price-display-and-record-keeping/invoicing-customers)
- [IRAS — Sample tax invoice](https://www.iras.gov.sg/images/default-source/uploadedimages/tax-invoice-2024.png)

## Project structure

```
invoice-app/
├── src/                # TypeScript source
│   ├── types.ts        # interfaces: LineItem, BusinessProfile, Customer, Invoice, AppState
│   ├── gst.ts          # calculateTotals() — IRAS-aligned GST rounding
│   ├── documents.ts    # detectDocumentType() / validateDocument()
│   ├── paynow.ts       # EMVCo TLV PayNow QR payload builder
│   ├── format.ts       # formatMoney(), formatDate(), escapeHtml()
│   ├── storage.ts      # localStorage persistence, invoice history, JSON export/import
│   ├── main.ts         # vanilla DOM rendering, state management
│   ├── templates/
│   │   └── render.ts   # printable invoice HTML generator
│   └── __tests__/      # Vitest unit tests (gst, documents, paynow)
├── docs/               # built static site (GitHub Pages)
├── package.json
└── vite.config.ts
```

## Privacy

Invoice data is stored in your browser (`localStorage`) only. The hosted app on GitHub Pages does not send your data to any server.

## License

MIT
