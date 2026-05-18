# SG Invoice

A Singapore-focused invoice web app for small and home-based businesses. Create standard invoices, tax invoices, simplified tax invoices, and receipts with GST calculations aligned to IRAS guidance. Runs entirely in the browser — ideal for [GitHub Pages](https://pages.github.com/) hosting.

## Features

- **Business profile** — name, address, UEN, GST registration, bank / PayNow details
- **GST modes** — not GST-registered (simple invoice) or GST-registered (tax invoice / simplified / receipt)
- **Auto document type** — picks the right layout based on your GST status and customer
- **Line items** — quantity, unit price (ex GST when registered), discounts
- **GST @ 9%** — per-line or on-subtotal calculation (IRAS-accepted methods)
- **Live preview** — print or save as PDF via the browser
- **Local storage** — data stays on your device; export/import JSON backup
- **Python core** — `invoice_core` package with `pytest` for GST logic (UV-managed)

## Quick start

### Web app (local)

```bash
cd web
npm install
npm run dev
```

Open http://localhost:5173

### Python tests

```bash
uv sync --group dev
uv run pytest
```

### Build for GitHub Pages

```bash
cd web
# Replace invoice-app with your repository name
set VITE_BASE=/invoice-app/   # Windows CMD
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
| GST-registered, customer not GST-registered | **Receipt** (with “Price payable includes GST”) |

**GST registration** is generally required when taxable turnover exceeds **$1 million** (see [IRAS — Do I need to register for GST](https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/gst-registration-deregistration/do-i-need-to-register-for-gst)).

**InvoiceNow:** GST-registered businesses must eventually transmit invoice data via InvoiceNow-Ready solutions (phased from 2025–2029). This static app does **not** submit to IRAS; plan a certified Peppol/InvoiceNow provider when required. See [GST InvoiceNow Requirement](https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/gst-invoicenow-requirement).

**References**

- [IRAS — Invoicing customers](https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/basics-of-gst/invoicing-price-display-and-record-keeping/invoicing-customers)
- [IRAS — Sample tax invoice](https://www.iras.gov.sg/images/default-source/uploadedimages/tax-invoice-2024.png)

## Project structure

```
invoice-app/
├── src/invoice_core/   # Python: GST math, document rules
├── tests/              # pytest
├── scripts/            # optional local CLI
├── web/                # Vite + TypeScript SPA
├── docs/               # built static site (GitHub Pages)
└── pyproject.toml      # UV project config
```

## Optional CLI

```bash
uv run python scripts/export_pdf.py backup.json
```

Install `reportlab` for future PDF enhancements: `uv sync --extra cli`

## Privacy

Invoice data is stored in your browser (`localStorage`) only. The hosted app on GitHub Pages does not send your data to any server.

## License

MIT (add a LICENSE file if you publish the repo.)
