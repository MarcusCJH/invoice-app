# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Singapore small-business invoicing tool. The Python package (`src/invoice_core`) contains the authoritative GST calculation and document-type logic. The TypeScript web app (`web/`) re-implements the same logic client-side and runs entirely in the browser with no backend — state persists to `localStorage`.

## Commands

### Python (managed with `uv`)

```bash
uv sync --extra dev          # install dev deps into .venv
uv run pytest                # run all tests
uv run pytest tests/test_gst.py::test_per_line_gst_matches_iras_example  # single test
uv sync --extra cli          # install reportlab for PDF CLI support
python scripts/export_pdf.py <json_file>  # CLI invoice summary
```

### Web (Vite + TypeScript)

```bash
cd web
npm install
npm run dev      # dev server (hot reload)
npm run build    # tsc type-check + Vite production build → web/dist/
npm run preview  # serve the production build locally
```

## Architecture

### Python package (`src/invoice_core/`)

Three modules with a clear dependency chain:

- **`models.py`** — pure dataclasses (`LineItem`, `BusinessProfile`, `Customer`, `Invoice`) and the `CalculationMethod` enum. No logic.
- **`gst.py`** — `calculate_totals()` implementing IRAS-specified GST rounding. Two calculation methods: `PER_LINE` (9% applied per line, then summed) and `ON_SUBTOTAL` (9% applied once to taxable subtotal). Cash rounding to nearest 5¢ is optional. Uses `Decimal` throughout to avoid floating-point errors.
- **`documents.py`** — `detect_document_type()` selects among INVOICE / TAX_INVOICE / SIMPLIFIED_TAX_INVOICE / RECEIPT based on the seller's GST registration status, the customer's GST status, and whether the total exceeds $1,000 (the IRAS simplified tax invoice threshold). `validate_document()` enforces field requirements per document type.

### TypeScript web app (`web/src/`)

Mirrors the Python logic exactly using plain `number` arithmetic (not `Decimal`):

- **`types.ts`** — TypeScript interfaces mirroring the Python dataclasses. `AppState` = `{profile, invoice, nextSequence}`.
- **`gst.ts`** / **`documents.ts`** — direct ports of the Python GST and document logic.
- **`storage.ts`** — `localStorage` persistence under key `sg-invoice-app-v1`. `loadState()` merges saved data with defaults to handle schema evolution. `exportJson()` / `importJson()` for JSON backup/restore.
- **`templates/render.ts`** — generates the printable invoice HTML string. Simplified tax invoices and receipts show "Price payable includes GST" and use GST-inclusive line amounts; full tax invoices show ex-GST unit prices plus a separate GST column.
- **`main.ts`** — vanilla DOM rendering (no framework). `render()` rebuilds the entire `#app` DOM on every state change. `bindInput()` is a helper that wires form inputs to state mutations and calls `persist()`.

### GST calculation rules (IRAS-aligned)

- `PER_LINE`: GST computed per line item, then summed. When a discount is applied, line GSTs are scaled proportionally by `taxable / subtotal`.
- `ON_SUBTOTAL`: GST computed once on the taxable subtotal.
- These two methods can produce different totals for the same line items (e.g., the IRAS stationery example in `tests/test_gst.py`).
- The `$1,000` threshold for simplified tax invoices applies to `total_incl_gst`.

### PDF output

There is no server-side PDF rendering. The intended workflow is browser `window.print()` → "Save as PDF". `scripts/export_pdf.py` is a stub that prints a JSON summary and notes reportlab is not yet integrated.
