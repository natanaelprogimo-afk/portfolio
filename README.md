# Alerson Morales — Software Engineering Portfolio

**Web:** https://natanaelprogimo-afk.github.io/portfolio/en/  
**Español:** https://natanaelprogimo-afk.github.io/portfolio/es/  
**Live engineering lab:** https://natanaelprogimo-afk.github.io/portfolio/en/labs/  
**Engineering case studies:** https://natanaelprogimo-afk.github.io/portfolio/en/cases/

Recruiter-oriented portfolio written with React, TypeScript and Vite. Public code examples are **independently implemented** and use synthetic data; they are not copies or live deployments of VYRA private products.

## V10: published-site accessibility and evidence priorities

- Independent live visual audit found long-scroll UX, menu focus escape, lab hash navigation that did not scroll, mobile translated recruiter navigation wrapping, and Spanish UI remnants.
- Navigation now traps keyboard focus inside the expanded mobile header, restores focus on Escape and disables background scrolling while open.
- Direct engineering-lab hashes select **and scroll to** the selected panel, including future hash changes.
- Work cards order inspectable public work before client-reported and private prototypes. Card numbering and generic Spanish technologies are presentation-localized.
- Responsive contact shortcut, reduced mobile card density and bilingual section numbering improve discoverability.
- CI exercises hash navigation, mobile keyboard focus, Spanish project labels and recruiter-header layout.
- [Upwork portfolio editorial package](docs/UPWORK_EVIDENCE_PACK_V10.md) contains accurately scoped draft cases; it is **not** uploaded to Upwork and carries no invented customer or revenue evidence.

## V9: premium evidence-led UX refresh and buyer vs recruiter contact

- A new layered editorial design system in `src/v9.css`: compact navigation and hero, stronger readable contrast, cleaner project cards, clear evidence paths and mobile-first layouts (320px+).
- Dedicated **remote engineering** and **VYRA business software** inquiry cards; two distinct prefilled email subjects, truthful commercial disclaimers, links to hiring evidence and the trust center.
- Conceptual architecture illustration visibly identifies itself as *not a product screenshot*; no fake dashboards, certifications or usage statistics.
- Accessible current-section navigation using `aria-current="location"`; refined 44px touch goals, focus, reduced motion and forced-color support.
- Browser QA verifies contact flows, correct localized links, active navigation and 320px card boundaries. This does **not** claim perfect WCAG compliance or measured real-user Core Web Vitals.
- [LinkedIn profile audit and publication kit](docs/LINKEDIN_PROFILE_V9_ACTUAL_AUDIT.md) reflects the actual logged-in **read-only** browser tab, without editing the user's account.

## V8: release integrity and touch-accessibility improvements

- Pages deploys are triggered **only** by the successful full `Quality checks` workflow on `main`, checking out the **exact SHA** that passed Chrome and axe-core.
- Removed unused `react-router-dom` and orphaned packages from the locked dependency tree.
- Increased small interactive targets and made accordion `aria-controls` conditional on the actual visible panel; expanded browser tests verify the behavior.
- Strengthened keyboard focus states and reduced-motion treatment.
- These measures improve **portfolio release safety**; they are not independent SaaS security certification or measured customer Core Web Vitals.

## V7: two distinct journeys for hiring and SaaS/agent due diligence

- The homepage now routes **recruiters** to the bilingual hiring brief and **prospective VYRA buyers** to the trust center, without suggesting unverified products are already available.
- Main hero actions emphasize executable public evidence and commercial due diligence rather than overwhelming users with five competing equal-priority links.
- Responsive audience cards and minimum-sized tap targets improve navigation and keyboard use; pre-existing Chrome/axe regressions are extended.
- Professional `schema.org/Person` JSON-LD identifies the actual developer, publicly verifiable social links and Uruguay only; it does not claim certifications or a registered separate company.
- [UX audit and next-phase evidence roadmap](docs/PORTFOLIO_UX_AUDIT_V7.md).

## Seven SaaS/agent products — private commercial intake preparation

- [Seven anonymous product intake dossiers](commercial/README.md): P01–P07 with placeholders only; **no product names, features, claims or prices are inferred**.
- [15 launch gates per product](commercial/seven-products.template.json): all 105 start `NOT_VERIFIED` and no product is approved for sale.
- [Readiness validator](commercial/validate.mjs) with deliberate fail-closed rules and public-repo anonymity guard.
- [Security and procurement templates](commercial/templates/) for agent permissions, data flows, sales/acceptance, customer questionnaires, support/incident/exit and release evidence.
- Use `npm run test:commercial` and `npm run commercial:check` to validate structure; this does not certify actual software.
- **Never add actual private implementation information or customer data to this public repository.** Move factual product dossiers to a verified private workspace when the owner supplies the seven descriptions.
- No public product pages, pricing, payment integration, or customer onboarding have been authorized or created.

## VYRA commercial trust and product readiness

- [Trust center (English)](https://natanaelprogimo-afk.github.io/portfolio/en/trust/) and [Centro de confianza](https://natanaelprogimo-afk.github.io/portfolio/es/trust/)
- [Buyer due diligence and assurance requirements](docs/VYRA_BUYER_ASSURANCE.md)
- [Product-by-product commercial and security release gates](docs/VYRA_LAUNCH_GATES.md)
- Future SaaS/agents are clearly labelled as private development or planned; no unverified SOC 2, ISO 27001, independent pentest, SLA or commercial availability claims.
- Commercial trust pages are checked for browser navigation, privacy-safe copy and automated accessibility.

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
