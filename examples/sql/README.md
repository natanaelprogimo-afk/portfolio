# SQL reporting exercises — reproducible SQLite examples

**Status:** independent, public educational exercises using synthetic data. No customer records or production database.

## Requirements

Python 3.11+ standard library. No external Python dependency, database server, or paid account required.

## Run all SQL tests

From the repository root:

```bash
python -m unittest discover -s examples/sql -p "test_*.py" -v
```

Tests create a fresh **in-memory SQLite database**, load [schema and fictional seed data](schema-and-seed.sql), run [queries](queries.sql), and verify aggregations, deterministic latest-event selection, indexes and valid query execution.

## Browse the scripts interactively (optional)

With the SQLite CLI installed:

```bash
sqlite3 :memory:
```

Then, in the SQLite prompt opened from repository root:

```sql
.read examples/sql/schema-and-seed.sql
.read examples/sql/queries.sql
.schema orders
```

You can also inspect the files without installing SQLite CLI; Python's built-in sqlite3 already runs the tests.

## Behavior demonstrated

- Explicit data schema and seeded synthetic order/event records.
- Aggregation by customer and paid status.
- Window-function ranking of event history with deterministic tie breaks.
- Index-presence checks and executable SQL queries.

## Limitations

This illustrates SQLite queries and testing. It does **not** demonstrate production database security, multi-user scaling, live reporting, deployment, a hosted service, or proven customer outcomes. SQL query plans and performance are not benchmarked as production metrics.
