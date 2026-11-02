# Alerson Morales — Software Engineering Portfolio

**Public site:** https://natanaelprogimo-afk.github.io/portfolio/  
**Interactive demonstrations:** https://natanaelprogimo-afk.github.io/portfolio/labs/  
**Engineering case studies:** https://natanaelprogimo-afk.github.io/portfolio/cases/  
**Résumé:** downloadable English and Spanish PDFs with clickable link annotations and declared language + printable HTML as the more accessible alternative.

A bilingual, recruiter-first developer portfolio built with React, TypeScript, Vite and responsive CSS.

## New V3 additions

- Independent static, search-readable English and Spanish entry pages with explicit canonical URLs and hreflang.
- Language-specific lab and case-study paths.
- Python standard-library API sample and SQLite analytical SQL examples, both with automated tests: [examples/README.md](examples/README.md).
- Safer CSV/price/date validation and additional regression tests.
- CI and Pages deployment run lint, Node tests, and Python tests before publishing.

## What is real and verifiable

- 5 clearly labeled project case studies, including public code and private projects.
- Three **independent public engineering exercises** with working in-browser behavior:
  - CSV feed reconciliation and validation.
  - Idempotency and conflict handling.
  - Structured event aggregation.
- Source for the examples: `public/labs/logic.mjs`, with Node unit tests in `scripts/labs.test.mjs`.
- The public examples use **synthetic data** and are **not** published screenshots or code from private VYRA apps.
- Private project statuses and evidence boundaries are explained in `public/cases/index.html`.

## Start locally

Requires Node.js 22.12+.

```bash
npm ci
npm run dev
```

## Verify

```bash
npm run build
npm run lint
npm test
```

Smoke tests include the published assets, correct Vite base path, résumé PDF signatures, privacy check, and sample provenance.

## Publish

GitHub Pages is enabled using GitHub Actions. Pushes to `main` trigger `.github/workflows/deploy.yml` with `GITHUB_PAGES=true`; PRs run `quality.yml`. Inspect workflow success and live routes after each release.

## Maintain

| Area | Source |
| --- | --- |
| Main page and interactions | `src/App.tsx` |
| Bilingual copy | `src/data/copy.ts` |
| Project statuses/evidence | `src/data/projects.ts` |
| Main design | `src/index.css` |
| Interactive demos | `public/labs/` |
| Technical case studies | `public/cases/` |
| Printable résumé | `public/resume.html` |
| Downloadable résumés | `generated at build time by `scripts/build-resumes.mjs` (source versions also in `public/`) |
| Search metadata | `index.html`, `public/sitemap.xml` |
| Social preview | `public/og-preview.svg` |

## Honest evidence policy

- Never publish private customer code, API keys, test credentials or confidential screenshots.
- Don't describe internal prototypes as public production releases.
- Don't invent customer testimonials, revenue, conversion figures or benchmarks.
- Screenshots of private projects may be added after visual inspection, provenance verification, and permission checks.
- PDF résumés intentionally omit identity document numbers, addresses and private data.
- The social preview is provided as SVG; some social services may require a raster PNG/JPG for image previews.

## Remaining independent work

- Verify screenshots from the original private projects and permissions for the two client sites.
- Publish stronger public code samples with full build/run steps when disclosure is safe.
- Run third-party Lighthouse and accessibility audits on production; no scores are claimed without measurements.
- GitHub profile README and repository metadata may need settings-level access not exposed by the current GitHub connector.

© 2026 Alerson Morales. Private projects retain their original ownership and licensing terms.
