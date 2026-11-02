-- Standalone SQLite demo; synthetic, non-sensitive data.
PRAGMA foreign_keys = ON;
CREATE TABLE customers(customer_id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE orders(
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
  created_at TEXT NOT NULL,
  total_cents INTEGER NOT NULL CHECK(total_cents > 0),
  status TEXT NOT NULL CHECK(status IN ('pending','paid','refunded'))
);
CREATE INDEX idx_orders_customer_recent ON orders(customer_id,created_at DESC);
CREATE INDEX idx_orders_status_recent ON orders(status,created_at DESC);
CREATE TABLE events(
  event_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(order_id),
  event_type TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_events_order_latest ON events(order_id,created_at DESC);
INSERT INTO customers VALUES(1,'Sample A'),(2,'Sample B');
INSERT INTO orders VALUES
  (101,1,'2026-10-29T10:00:00Z',2999,'paid'),
  (102,1,'2026-10-30T11:00:00Z',4500,'refunded'),
  (103,2,'2026-10-30T15:00:00Z',1500,'paid'),
  (104,2,'2026-10-31T08:00:00Z',2000,'pending');
INSERT INTO events VALUES
  (1,101,'created','2026-10-29T10:00:00Z'),
  (2,101,'paid','2026-10-29T10:01:00Z'),
  (3,102,'paid','2026-10-30T11:01:00Z'),
  (4,102,'refunded','2026-10-30T13:00:00Z'),
  (5,103,'paid','2026-10-30T15:01:00Z'),
  (6,104,'created','2026-10-31T08:00:00Z');
