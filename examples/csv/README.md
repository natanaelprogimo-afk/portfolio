# Python CSV reconciliation — independent engineering demonstration

**Status:** public educational sample with deterministic, fictional data. Not a
commercial VYRA deployment or completed client contract.

## Run

Requires Python 3.11+ only.

```bash
python examples/csv/reconcile.py --feed examples/csv/fixtures/feed.csv --observed examples/csv/fixtures/observed.csv --output report.csv
python -m unittest discover -s examples/csv -p "test_*.py" -v
```

The report identifies `match`, `mismatch`, `missing`, and `extra` SKUs. It
uses `decimal.Decimal` for money-like quantities, validates required columns,
rejects duplicate SKU identifiers, malformed rows, nonfinite/negative prices,
and escapes potentially dangerous spreadsheet formula prefixes in exported text.

**Limitations:** small CSV files are loaded in memory; exact price equality is
used (no currency conversion or taxes); no remote APIs, accounts, database,
user interface, payouts, or customer data are involved. Files are local only.
The interactive JavaScript browser demo under `public/labs/` is a **separate**
implementation; it must not be presented as this Python script.
