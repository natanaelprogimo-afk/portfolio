# Python HTTP / SQLite — reproducible local API

**Status:** independently implemented educational backend sample. It is **not** a deployed commercial API, authenticated service, or client system.

## Requirements

Python 3.11+ and its standard library. No external packages, cloud service, accounts, or network dependencies are needed.

## Start the server

Run from the root of this repository:

```bash
python examples/backend/service.py
```

The server listens **only on 127.0.0.1:8765**. Its SQLite database is in memory and resets on every restart. It is unsuitable for public hosting.

## Verify the HTTP contract

```bash
curl http://127.0.0.1:8765/health
# {"status": "ok", "sample": true}

curl -i -X POST http://127.0.0.1:8765/v1/orders \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: demo-001" \
  -d '{"sku":"SKU-001","quantity":3,"unit_price_cents":2999}'
```

The first valid POST returns **HTTP 201**, including `id`, `sku`, `amount_cents: 8997` and `replayed: false`. Repeat **the same request and key** to receive **HTTP 200** and `replayed: true`, without creating a second order. Reusing the key with a **different** request yields **HTTP 409**. Invalid keys or payloads yield **HTTP 400**.

## Reproduce the tests

From the repository root:

```bash
python -m unittest discover -s examples/backend -p "test_*.py" -v
```

The unit tests cover validation, idempotency replay/conflict, single-order semantics, and concurrent calls against the local in-memory service. A passing test is not a production-security audit.

## Technical boundaries

- The service uses Python `ThreadingHTTPServer`, `sqlite3`, `RLock` and SHA-256 signatures. IDs and sample data are synthetic.
- No authentication, authorization, HTTPS, database persistence, durable idempotency, rate limiting, audit storage, monitoring, multi-process safety or deployment hardening is included.
- Input size is bounded to 16 KiB and quantity/price fields are validated. **Never expose the demo to the public Internet**.
- See [the source](service.py) and [unit tests](test_service.py). The interactive [browser idempotency lab](../../public/labs/) is a separate JavaScript implementation, **not** a running instance of this Python API.
