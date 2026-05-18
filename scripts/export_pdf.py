"""Optional local CLI: print invoice JSON summary (PDF via reportlab if installed)."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Export invoice data from JSON backup.")
    parser.add_argument("json_file", type=Path, help="Exported invoice JSON file")
    args = parser.parse_args()

    data = json.loads(args.json_file.read_text(encoding="utf-8"))
    print(f"Invoice: {data.get('invoice', {}).get('invoiceNumber', 'unknown')}")
    print(f"Customer: {data.get('invoice', {}).get('customer', {}).get('name', '')}")
    print("Open the web app and use Print / Save as PDF for formatted output.")

    try:
        import reportlab  # noqa: F401
    except ImportError:
        print(
            "Install CLI extras for future PDF support: uv sync --extra cli",
            file=sys.stderr,
        )


if __name__ == "__main__":
    main()
