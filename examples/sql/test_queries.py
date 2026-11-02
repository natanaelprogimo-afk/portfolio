import sqlite3
import unittest
from pathlib import Path

BASE=Path(__file__).parent

class TestSQL(unittest.TestCase):
    def setUp(self):
        self.db=sqlite3.connect(":memory:")
        self.db.executescript((BASE/"schema-and-seed.sql").read_text(encoding="utf-8"))

    def tearDown(self):
        self.db.close()

    def test_aggregation(self):
        rows=self.db.execute("""
          SELECT customer_id,SUM(total_cents) FROM orders
          WHERE status='paid' GROUP BY customer_id ORDER BY customer_id
        """).fetchall()
        self.assertEqual(rows,[(1,2999),(2,1500)])

    def test_latest_event(self):
        rows=self.db.execute("""
          WITH ranked AS (
            SELECT order_id,event_type,ROW_NUMBER() OVER(
              PARTITION BY order_id ORDER BY created_at DESC,event_id DESC
            ) AS rn FROM events
          )
          SELECT order_id,event_type FROM ranked WHERE rn=1 ORDER BY order_id
        """).fetchall()
        self.assertEqual(rows,[(101,'paid'),(102,'refunded'),(103,'paid'),(104,'created')])

    def test_schema_indexes(self):
        indexes=[row[1] for row in self.db.execute("PRAGMA index_list('orders')")]
        self.assertIn("idx_orders_customer_recent",indexes)

    def test_demo_queries_execute(self):
        self.db.executescript((BASE/"queries.sql").read_text(encoding="utf-8"))

if __name__ == "__main__":
    unittest.main()
