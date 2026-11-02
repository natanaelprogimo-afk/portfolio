# Public engineering samples — original, independently testable code

These are new educational examples. They **are not** the private code of VYRA products and are not presented as production customer applications.

## Local Python HTTP service
Built entirely with Python's standard library and SQLite: JSON validation, transaction boundaries, request hashing, replay/409 idempotency and basic concurrent request tests.

```bash
python -m unittest discover -s examples/backend -p "test_*.py" -v
python examples/backend/service.py
```

Then submit a synthetic request:

```bash
curl -i -X POST http://127.0.0.1:8765/v1/orders -H "Idempotency-Key: sample-001" -H "Content-Type: application/json" --data '{"sku":"SKU-001","quantity":2,"unit_price_cents":2999}'
```

Repeat with the same key to see the replay. The service binds to localhost and stores data only in memory. **Not production-ready**: it deliberately does not implement authentication, TLS, monitoring, persistence or distributed idempotency.

## SQL exercise
Four synthetic orders and events, composite indexes, aggregation, window functions, and a query plan example. Executes against SQLite included in Python.

```bash
python -m unittest discover -s examples/sql -p "test_*.py" -v
```

Files: [schema-and-seed.sql](sql/schema-and-seed.sql), [queries.sql](sql/queries.sql).

## Browser lab
Three additional JavaScript samples are available at [the live interactive lab](https://natanaelprogimo-afk.github.io/portfolio/labs/).

**Evidence boundaries:** all inputs are fictitious; no claim of production adoption, paid transactions or customer outcomes.
