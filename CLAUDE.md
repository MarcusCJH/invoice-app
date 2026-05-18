# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Singapore small-business invoicing tool. Runs entirely in the browser with no backend — state persists to `localStorage`. Deployed as static files to GitHub Pages via the `docs/` directory.

## Commands

```bash
npm install
npm run dev      # dev server (hot reload)
npm run build    # tsc type-check + Vite production build → docs/
npm run preview  # serve the production build locally
```

## Architecture (`web/src/`)

- **`types.ts`** — TypeScript interfaces: `LineItem`, `BusinessProfile`, `Customer`, `Invoice`, `AppState`. `AppState` = `{profile, invoice, nextSequence}`.
- **`gst.ts`** — `calculateTotals()` implementing IRAS-specified GST rounding. `GST_RATE` and `SIMPLIFIED_TAX_INVOICE_MAX` are the authoritative constants. Two methods: `PER_LINE` (9% per line, then summed) and `ON_SUBTOTAL` (9% once on taxable subtotal). Cash rounding to nearest 5¢ optional. `roundCents()` uses the exponential-notation trick to avoid IEEE 754 errors.
- **`documents.ts`** — `detectDocumentType()` selects among INVOICE / TAX_INVOICE / SIMPLIFIED_TAX_INVOICE / RECEIPT / CREDIT_NOTE. `validateDocument()` enforces field requirements per document type.
- **`storage.ts`** — `localStorage` persistence under key `sg-invoice-app-v1`. `loadState()` merges saved data with defaults to handle schema evolution. `exportJson()` / `importJson()` for JSON backup/restore.
- **`templates/render.ts`** — generates the printable invoice HTML string. Simplified tax invoices and receipts show "Price payable includes GST" and use GST-inclusive line amounts; full tax invoices show ex-GST unit prices plus a separate GST column.
- **`main.ts`** — vanilla DOM rendering (no framework). `render()` rebuilds the entire `#app` DOM on every state change. `bindInput()` wires form inputs to state mutations and calls `persist()`.

## GST calculation rules (IRAS-aligned)

- `PER_LINE`: GST computed per line item, then summed. When a discount is applied, line GSTs are scaled proportionally by `taxable / subtotal`.
- `ON_SUBTOTAL`: GST computed once on the taxable subtotal.
- These two methods can produce different totals for the same line items.
- The `$1,000` threshold for simplified tax invoices applies to `total_incl_gst`.

## PDF output

No server-side rendering. The intended workflow is browser `window.print()` → "Save as PDF".
