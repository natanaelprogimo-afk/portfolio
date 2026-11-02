-- Run after schema-and-seed.sql.
-- Aggregation excluding refunded and pending orders.
SELECT c.customer_id,c.name,COUNT(o.order_id) AS orders_paid,
       SUM(o.total_cents) AS gross_paid_cents
FROM customers AS c JOIN orders AS o ON o.customer_id=c.customer_id
WHERE o.status='paid'
GROUP BY c.customer_id,c.name
ORDER BY gross_paid_cents DESC;

-- Window function: latest event per order.
WITH ranked AS (
  SELECT order_id,event_type,created_at,
         ROW_NUMBER() OVER(PARTITION BY order_id ORDER BY created_at DESC,event_id DESC) AS rn
  FROM events
)
SELECT o.order_id,o.status,r.event_type AS last_event
FROM orders AS o LEFT JOIN ranked AS r ON r.order_id=o.order_id AND r.rn=1
ORDER BY o.order_id;

-- Query plan for composite-index lookup; planner selection depends on statistics.
EXPLAIN QUERY PLAN
SELECT order_id,created_at,total_cents FROM orders
WHERE customer_id=1 ORDER BY created_at DESC LIMIT 20;

-- Financial reporting must reconcile processor payouts, fees and refunds.
-- An order marked 'paid' does not prove payment settlement.
