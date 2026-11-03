"""Tests for the independent CSV portfolio demonstration."""
import csv
import tempfile
import unittest
from pathlib import Path

from reconcile import ValidationError, export_csv, load_catalog, reconcile


class CsvReconciliationTests(unittest.TestCase):
    def setUp(self):
        self.folder = tempfile.TemporaryDirectory()
        self.addCleanup(self.folder.cleanup)
        self.root = Path(self.folder.name)

    def write(self, name, text):
        path = self.root / name
        path.write_text(text, encoding="utf-8")
        return path

    def test_four_outcomes_and_deterministic_order(self):
        feed = load_catalog(self.write("feed.csv",
            "sku,price,title\nA,19.00,Alpha\nB,10,Beta\nC,25,Gamma\n"))
        observed = load_catalog(self.write("observed.csv",
            "sku,price,title\na,19,Alpha\nB,12,Beta\nD,5,Delta\n"))
        rows = reconcile(feed, observed)
        self.assertEqual([(r["SKU"], r["Status"]) for r in rows],
                         [("A", "match"), ("B", "mismatch"),
                          ("C", "missing"), ("D", "extra")])
        self.assertEqual(rows[0]["Feed Price"], "19.00")
        self.assertEqual(rows[0]["Observed Price"], "19")

    def test_rejects_duplicate_and_invalid_prices(self):
        cases = [
            ("sku,price\nA,1\na,2\n", "duplicate SKU"),
            ("sku,price\nA,NaN\n", "nonnegative and finite"),
            ("sku,price\nA,-1\n", "nonnegative and finite"),
            ("sku,price\nA,abc\n", "invalid price"),
            ("sku,price\n,3\n", "mandatory"),
            ("sku,price\nA,2,unexpected\n", "unexpected columns"),
        ]
        for index, (text, message) in enumerate(cases):
            with self.subTest(index=index), self.assertRaisesRegex(ValidationError, message):
                load_catalog(self.write(f"bad{index}.csv", text))

    def test_rejects_missing_and_duplicate_headers(self):
        for index, data in enumerate(["name,amount\nA,1\n", "sku,price,sku\nA,2,B\n"]):
            with self.subTest(index=index), self.assertRaises(ValidationError):
                load_catalog(self.write(f"headers{index}.csv", data))

    def test_quoted_csv_and_utf8_bom(self):
        path = self.write("quoted.csv", "\ufeffsku,price,title\nA,12,\"Hello, world\"\n")
        rows = load_catalog(path)
        self.assertEqual(rows["a"]["title"], "Hello, world")

    def test_spreadsheet_formula_is_escaped(self):
        feed = load_catalog(self.write("formula.csv", "sku,price,title\nA,20,\"=HYPERLINK(\\\"bad\\\")\"\n"))
        rows = reconcile(feed, feed)
        # The outgoing CSV must not permit leading spreadsheet formulas.
        rows[0]["Feed Title"] = " \t=1+1"
        path = self.root / "result.csv"
        export_csv(rows, path)
        with path.open(encoding="utf-8", newline="") as stream:
            exported = list(csv.DictReader(stream))
        self.assertTrue(exported[0]["Feed Title"].startswith("'"))


if __name__ == "__main__":
    unittest.main()
