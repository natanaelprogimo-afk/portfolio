# Alerson Morales — Full-Stack Software Developer

**Python automation · REST APIs · React/Next.js · SQL · Reliable data workflows**

Independent developer based in Uruguay, available for **100% remote engineering roles** and clearly scoped freelance development.

[**View portfolio (English)**](https://natanaelprogimo-afk.github.io/portfolio/en/) · [**Ver portafolio (Español)**](https://natanaelprogimo-afk.github.io/portfolio/es/) · [**Recruiter brief**](https://natanaelprogimo-afk.github.io/portfolio/en/hiring/) · [**Upwork**](https://www.upwork.com/freelancers/~016487e77ebf028c40)

## Verified engineering case studies — V13

The bilingual [technical case study library (English)](https://natanaelprogimo-afk.github.io/portfolio/en/cases/) / [casos técnicos (Español)](https://natanaelprogimo-afk.github.io/portfolio/es/cases/) presents three independently inspectable public examples first, followed by four transparently labeled private/client projects.

- [Python CSV reconciliation](https://natanaelprogimo-afk.github.io/portfolio/en/cases/#python-csv) — source, synthetic fixtures, decimal-money comparisons, explicit statuses, tests and scope limits.
- [Python HTTP / SQLite](https://natanaelprogimo-afk.github.io/portfolio/en/cases/#python-api) — local HTTP behavior, input validation, idempotency and unit tests; not a hosted API.
- [React / TypeScript portfolio](https://natanaelprogimo-afk.github.io/portfolio/en/cases/#portfolio) — public front-end, bilingual routes, accessible components and CI browser tests.

All case descriptions are compiled from explicit English/Spanish structured data (`scripts/render-cases.mjs`), rather than replacing phrases in the English case HTML. Shared static-page navigation styles are in `public/shared-pages.css`; project case styling is in `public/cases.css`.

## Demonstrable public work

| Example | Try or inspect | Evidence and boundaries |
| --- | --- | --- |
| Interactive JavaScript engineering lab | [Run in browser](https://natanaelprogimo-afk.github.io/portfolio/en/labs/) | Synthetic CSV comparison, idempotency and event aggregation; no remote backend |
| Python HTTP/SQLite sample | [Source + tests](examples/backend/) | Validation, replay/conflict handling and unit tests; local educational service |
| Python CSV reconciliation | [CLI + tests](examples/csv/) | Independent Python implementation, fictional input fixtures, CSV export and unittest |
| SQL reporting exercises | [Queries + tests](examples/sql/) | Schema, indexes, window functions and explainable query plans |
| This bilingual portfolio | [React/TypeScript source](src/) | Accessible UI, CI checks, EN/ES pages and GitHub Pages deployment |

## Selected project experience

- **Two business websites completed** — dental practice and paint retailer. Client URLs and screenshots are not public until permission is confirmed.
- **Catalog Integrity Engine** — internal data comparison prototype, distinct from the public synthetic examples.
- **AI Automation Factory** — private development; production adoption and customer outcomes are not claimed.
- **VYRA Fitness** — private design/testing; no public app-store release is claimed.

[Engineering case studies](https://natanaelprogimo-afk.github.io/portfolio/en/cases/) · [VYRA buyer trust and security](https://natanaelprogimo-afk.github.io/portfolio/en/trust/)

## Run and test locally

Requirements: Node.js 22.12+ and Python 3.11+.

```bash
npm ci
npm run dev
npm run build
npm run lint
npm test
python -m unittest discover -s examples/backend -p "test_*.py" -v
python -m unittest discover -s examples/sql -p "test_*.py" -v
python -m unittest discover -s examples/csv -p "test_*.py" -v
```

GitHub Actions additionally runs Chrome end-to-end and automated axe-core accessibility checks; the deploy workflow checks out the exact commit that passed quality checks. These tests do not constitute independent WCAG certification or SaaS security attestation.

## Source and documentation

- Website: `src/App.tsx`, `src/data/`, `src/v9.css`, `src/index.css`
- Interactive lab: `public/labs/` and `scripts/labs.test.mjs`
- Python and SQL examples: `examples/`
- CI and Pages: `.github/workflows/`
- [Detailed V1–V10 implementation history](docs/PORTFOLIO_VERSION_HISTORY_V10.md)
- [Reproducible Upwork case publishing notes](docs/UPWORK_EVIDENCE_PACK_V10.md)
- [Profile README ready for publication](docs/GITHUB_PROFILE_README.md)

**Evidence policy:** all public demonstrations are independent examples using synthetic data. Private VYRA implementations, credentials and customer data are excluded. No results, clients, certifications, or sales are fabricated.

© 2026 Alerson Morales.
