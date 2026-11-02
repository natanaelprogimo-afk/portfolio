# Alerson Morales — Software Engineering Portfolio

**Web:** https://natanaelprogimo-afk.github.io/portfolio/en/  
**Español:** https://natanaelprogimo-afk.github.io/portfolio/es/  
**Live engineering lab:** https://natanaelprogimo-afk.github.io/portfolio/en/labs/  
**Engineering case studies:** https://natanaelprogimo-afk.github.io/portfolio/en/cases/

Recruiter-oriented portfolio written with React, TypeScript and Vite. Public code examples are **independently implemented** and use synthetic data; they are not copies or live deployments of VYRA private products.

## Career preparation (2026)

- [LinkedIn professional copy](docs/LINKEDIN_PROFILE_READY.md) — prepared; requires authenticated owner review before publishing
- [GitHub profile README](docs/GITHUB_PROFILE_README.md) — prepared; copy into a public same-username profile repository
- [Hiring and résumé checklist](docs/CAREER_PUBLISHING_CHECKLIST.md) — verification and privacy gates
- Two public PDF résumés generated on each build; Spanish copy retains accents, with future role-specific DOCX/PDF templates supplied separately to the owner

## V5: recruiter brief, exportable examples and accessibility audits

- [English recruiter brief](https://natanaelprogimo-afk.github.io/portfolio/en/hiring/) and [Spanish recruiter brief](https://natanaelprogimo-afk.github.io/portfolio/es/hiring/): standalone, printable, source-backed one-page professional summary.
- Browser lab supports local CSV report downloads for catalog reconciliation and event metrics. Export escapes spreadsheet-formula prefixes; downloads occur only from direct user actions, without external requests.
- CI runs the working browser demo flows and an automated axe-core accessibility audit for English/Spanish home, lab, cases and hiring pages. Serious/critical findings block merges. This does not replace manual WCAG validation.
- No private code, identifiers or fabricated statistics have been added.

## What an interviewer can verify

- [Browser-based examples](https://natanaelprogimo-afk.github.io/portfolio/en/labs/) with editable test input: CSV reconciliation, request idempotency and event metrics.
- [Python API example](examples/backend/service.py) using the standard library, input validation, SQLite, and idempotency, with [automated tests](examples/backend/test_service.py).
- [SQL examples](examples/sql/) with synthetic schemas, indexed queries, a window function, a query plan and tests.
- [Five portfolio case studies](https://natanaelprogimo-afk.github.io/portfolio/en/cases/) with explicit limitations for private work.
- One-page English/Spanish PDF résumés and a printable HTML résumé. Private identity documents are intentionally omitted.

## Run it locally

Requires Node.js 22.12+ and Python 3.11+ for the backend/SQL tests.

```bash
npm ci
npm run dev
```

## Quality checks

```bash
npm run build
npm run lint
npm test
python -m unittest discover -s examples/backend -p "test_*.py" -v
python -m unittest discover -s examples/sql -p "test_*.py" -v
```

CI additionally executes a real Chrome browser regression suite across desktop and mobile widths, checking navigation, hash linking, language, lab tabs and PDFs. GitHub Pages deployment runs build/lint and tests before publication.

## Source map

| Area | Path |
| --- | --- |
| React app | `src/App.tsx` |
| Public engineering proof | `src/components/VerifiedWork.tsx` |
| Translated copy | `src/data/copy.ts` |
| Project data and statuses | `src/data/projects.ts` |
| Design system | `src/index.css` |
| Static locale builder | `scripts/build-locales.mjs` |
| Recruiter brief generator | `scripts/build-hiring.mjs` |
| Accessibility regression | `scripts/accessibility.e2e.mjs` |
| Interactive lab | `public/labs/` |
| Public backend and SQL examples | `examples/` |
| Case studies | `public/cases/` |
| PDF résumé generator | `scripts/build-resumes.mjs` |
| SEO and Open Graph assets | `index.html`, `public/og-preview.svg`, `scripts/render-social.mjs` |
| Test workflows | `.github/workflows/quality.yml`, `.github/workflows/deploy.yml` |

## Evidence policy

Private repositories, credentials, client data and unapproved media are not made public. Client website completions are stated without invented URLs or conversion figures. The private fitness app remains in design and testing. Original screenshots and videos will only be added after verification and permission review.

## Known outstanding improvements

- Original, authorized screenshots and recorded walkthroughs for private applications.
- Client website references where public portfolio use is permitted.
- GitHub repository About metadata still needs editing through an authenticated account session.
- Formal WCAG 2.2 manual assistive-technology review and live Core Web Vitals measurements.

© 2026 Alerson Morales. Separate private products retain their respective rights and licenses.
