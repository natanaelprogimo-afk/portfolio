"""Small, reproducible CSV reconciliation tool; no external dependencies or network I/O.

Inputs are fictional samples for portfolio demonstration. This is not a VYRA
commercial component, not a payment reconciliation product, and not a claim
of deployment for any customer.
"""
from __future__ import annotations

import argparse
import csv
from decimal import Decimal, InvalidOperation
from pathlib import Path


class ValidationError(ValueError):
    """The input is missing required columns or contains invalid records."""


def load_catalog(path: Path) -> dict[str, dict[str, str | Decimal]]:
    catalog: dict[str, dict[str, str | Decimal]] = {}
    try:
        with path.open("r", newline="", encoding="utf-8-sig") as stream:
            reader = csv.DictReader(stream, restkey="_extra_fields", restval=None, strict=True)
            if not reader.fieldnames or not {"sku", "price"}.issubset(reader.fieldnames):
                raise ValidationError(f"{path.name}: required headers are sku and price")
            if len(reader.fieldnames) != len(set(reader.fieldnames)):
                raise ValidationError(f"{path.name}: duplicate header")
            for line, row in enumerate(reader, start=2):
                if row.get("_extra_fields") is not None:
                    raise ValidationError(f"{path.name}:{line}: unexpected columns")
                raw_sku, raw_price = row.get("sku"), row.get("price")
                sku = (raw_sku or "").strip()
                if not sku or not raw_price or not raw_price.strip():
                    raise ValidationError(f"{path.name}:{line}: sku and price are mandatory")
                key = sku.casefold()
                if key in catalog:
                    raise ValidationError(f"{path.name}:{line}: duplicate SKU {sku}")
                try:
                    price = Decimal(raw_price.strip())
                except InvalidOperation as exc:
                    raise ValidationError(f"{path.name}:{line}: invalid price") from exc
                if not price.is_finite() or price < 0:
                    raise ValidationError(f"{path.name}:{line}: price must be nonnegative and finite")
                catalog[key] = {
                    "sku": sku,
                    "price": price,
                    "title": (row.get("title") or "").strip(),
                }
    except (OSError, UnicodeError, csv.Error) as exc:
        raise ValidationError(f"{path.name}: cannot read CSV: {exc}") from exc
    return catalog


def reconcile(
    feed: dict[str, dict[str, str | Decimal]],
    observed: dict[str, dict[str, str | Decimal]],
) -> list[dict[str, str]]:
    result: list[dict[str, str]] = []
    for key in sorted(set(feed) | set(observed)):
        left, right = feed.get(key), observed.get(key)
        if left is None:
            status = "extra"
        elif right is None:
            status = "missing"
        else:
            status = "match" if left["price"] == right["price"] else "mismatch"
        result.append({
            "SKU": str((left or right)["sku"]),
            "Status": status,
            "Feed Price": format(left["price"], "f") if left else "",
            "Observed Price": format(right["price"], "f") if right else "",
            "Feed Title": str(left["title"]) if left else "",
            "Observed Title": str(right["title"]) if right else "",
        })
    return result


COLUMNS = ["SKU", "Status", "Feed Price", "Observed Price", "Feed Title", "Observed Title"]


def safe_spreadsheet_cell(value: str) -> str:
    """Prefix text that a spreadsheet might interpret as a formula."""
    if value.lstrip(" \t\r\n").startswith(("=", "+", "-", "@")):
        return "'" + value
    return value


def export_csv(rows: list[dict[str, str]], output: Path) -> None:
    with output.open("w", encoding="utf-8", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=COLUMNS)
        writer.writeheader()
        for row in rows:
            writer.writerow({key: safe_spreadsheet_cell(row[key]) for key in COLUMNS})


def main() -> None:
    parser = argparse.ArgumentParser(description="Reconcile two small synthetic CSV catalogs.")
    parser.add_argument("--feed", type=Path, required=True)
    parser.add_argument("--observed", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    try:
        rows = reconcile(load_catalog(args.feed), load_catalog(args.observed))
        export_csv(rows, args.output)
    except (ValidationError, OSError) as exc:
        parser.error(str(exc))
    counts = {status: sum(row["Status"] == status for row in rows)
              for status in ("match", "mismatch", "missing", "extra")}
    print("Comparison complete:", counts, "| report:", args.output)


if __name__ == "__main__":
    main()
