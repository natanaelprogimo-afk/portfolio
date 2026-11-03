# VYRA / Alerson — evidence-backed Upwork portfolio publishing kit V10

**Status:** four drafts prepared from real PUBLIC SOURCE CODE; **not added to Upwork**. Existing React/Next.js Upwork portfolio project remains untouched, and zero completed Upwork contracts should continue to be reported as zero. Pricing remains **US$20/hr**.

**Hard requirements:** Upwork project portfolio materials must not display emails, personal websites with direct contact solicitation, phone numbers, social-media messaging invitations, or external checkout URLs. Do not attach a screenshot from a simulated UI and present it as a client deployment. The materials below are independent engineering samples, not customer commissions, SaaS products or endorsements.

The code paths identify internal sources for verification; they are **not instructions to add off-platform contact links**.

## Candidate 1: Python CSV Data Cleaning & Reconciliation Demo

**Suggested Upwork title (46/70):** Python CSV Data Cleaning & Reconciliation Demo

**Your role:** Python Developer | Data Validation Engineer

**Description (406/600):**

Independent, testable browser demo using synthetic CSV feeds. Parses quoted fields, checks duplicate keys and invalid prices, compares product records, and groups match/mismatch/missing/extra results. Includes deterministic sample inputs, a downloadable CSV report, and automated Node.js test cases. Demonstrates a reusable approach to data-quality workflows; not a client contract or private VYRA release.

**Skills (confirm actual Upwork tags):** Python · Data Cleaning · Data Validation · CSV · Automation

**Public source proof to verify before posting:** `public/labs/logic.mjs and scripts/labs.test.mjs`

**Required original visuals:** Authentic browser capture: two CSV inputs → compare → categorized result table → downloaded report; include evidence of automated test output.

**Remaining publication gates:** browser/terminal screenshots captured from the actual implementation; test results rerun on a named commit; no private data; copyrights checked; confirm Upwork category/tag acceptance; manually check preview and publish through the Upwork editor.


## Candidate 2: Python REST API | Validation & Idempotent Requests

**Suggested Upwork title (50/70):** Python REST API | Validation & Idempotent Requests

**Your role:** Backend Python Developer

**Description (412/600):**

Independent Python-standard-library HTTP service with SQLite-backed sample behavior, request validation, replay handling and conflict responses for reused idempotency keys. Tests cover malformed payloads and concurrent submission of identical requests. The example runs locally and uses synthetic orders. It is educational code—not a deployed API, customer integration, or production-ready authentication system.

**Skills (confirm actual Upwork tags):** Python · RESTful API · SQLite · Software Testing · API Development

**Public source proof to verify before posting:** `examples/backend/service.py and examples/backend/test_service.py`

**Required original visuals:** Real terminal capture: start localhost service, send a sample request, repeat with same key, show replay/conflict, then run unittest and record exact result.

**Remaining publication gates:** browser/terminal screenshots captured from the actual implementation; test results rerun on a named commit; no private data; copyrights checked; confirm Upwork category/tag acceptance; manually check preview and publish through the Upwork editor.


## Candidate 3: SQL Reporting | Joins, Window Functions & Indexes

**Suggested Upwork title (49/70):** SQL Reporting | Joins, Window Functions & Indexes

**Your role:** SQL Developer | Data Engineer

**Description (416/600):**

Reproducible SQL engineering exercise built on a synthetic SQLite order dataset. Includes schema and sample records, composite indexes, customer aggregation, window functions to identify the latest event per order, and an example query plan. Python unittest checks the expected results and confirms indexes and example queries execute. This is an independent technical demonstration, not a customer reporting system.

**Skills (confirm actual Upwork tags):** SQL · SQLite · Database Design · Query Optimization · Data Analysis

**Public source proof to verify before posting:** `examples/sql/schema-and-seed.sql, examples/sql/queries.sql and examples/sql/test_queries.py`

**Required original visuals:** Real terminal/sqlite capture: schema and sample data, SQL query, expected output, index plan, and passing unit tests.

**Remaining publication gates:** browser/terminal screenshots captured from the actual implementation; test results rerun on a named commit; no private data; copyrights checked; confirm Upwork category/tag acceptance; manually check preview and publish through the Upwork editor.


## Candidate 4: JavaScript API Retry & Event Metrics Demo

**Suggested Upwork title (41/70):** JavaScript API Retry & Event Metrics Demo

**Your role:** JavaScript Developer | Automation Engineer

**Description (433/600):**

Two deterministic JavaScript browser examples for automation reliability. The retry exercise records an idempotency key, distinguishes replay and conflicting payloads, and simulates an uncertain failure. The metrics exercise validates synthetic JSON events, groups days and calculates request counts, error rates and mean latency. Includes runnable logic and Node.js regression tests. No external API or customer system is connected.

**Skills (confirm actual Upwork tags):** JavaScript · Automation · Software Testing · JSON · Data Validation

**Public source proof to verify before posting:** `public/labs/logic.mjs and scripts/labs.test.mjs`

**Required original visuals:** Real browser captures: retry/replay/conflict and a JSON event input→aggregated results; run Node.js tests and capture results.

**Remaining publication gates:** browser/terminal screenshots captured from the actual implementation; test results rerun on a named commit; no private data; copyrights checked; confirm Upwork category/tag acceptance; manually check preview and publish through the Upwork editor.



## Existing React/Next.js example — audit before changing

Current Upwork item: `React & Next.js Bug Fixing | Tested Web Application Repairs`. Its current description claims repaired state, API error handling and a production Next.js build. These are **not independently verified by this specific public repository**. Before changing that card, locate the actual project source, exact failing test or bug reproduction, fixed commit, TypeScript and production build log and screenshot evidence. Do not copy a generic marketing animation over a missing code demonstration. Preserve the explicit label **independent demonstration**.

## Portfolio gallery storyboard (all new captures must be genuine)

1. **Problem/inputs:** an actual controlled browser/terminal capture, with synthetic data visibly labeled.
2. **Execution/solution:** genuine UI/code/CLI operations with relevant context, not a fabricated mockup.
3. **Verification/results:** exact test run output and precise input/output; redact credentials and URLs that would bypass Upwork.
4. **Delivery/readme:** verified installation/use instructions plus known limitations.

Use Upwork's currently displayed media recommendations and preview tool, checking image dimensions, file limits, accessibility and legibility before submitting.

## Contraindications / blocked steps

- No public references or permissioned screenshots have been supplied for the dental or paint-shop client websites: **do not fabricate them**.
- n8n screenshots/flows not retrieved/verified: **do not publish an n8n case as tested**.
- No connected Upwork tool exposes a reliable **freelancer portfolio project creation/update** endpoint here. The write-capable browser lacked Upwork authentication and failed to load. This document therefore does **not** claim to have created or published Upwork portfolio entries.
- The Upwork employment record `Upwork — Full Stack Developer` must not be re-described as Upwork corporate employment without knowing its exact relationship/date.
- Do not connect personally identifying contact data or VYRA checkout pages to Upwork portfolio media.

## Acceptance criteria

- Each example is demonstrable from source code and repeatable tests using strictly fictitious data.
- Titles <= 70 chars; descriptions <= 600 chars; suggested tags <= 5 and checked in Upwork's live editor.
- Each screenshot is derived from the running build and includes a date/version record retained privately.
- Upwork user profile and project gallery links stay within Upwork's current communication policies.
- No new product, testimonial, client or commercial revenue claim is published without evidence.
