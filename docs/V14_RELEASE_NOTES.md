# Portfolio V14 — implementation and evidence review

**Release status:** proposed in PR #18. This document describes code changes, not an assertion that GitHub Pages deployed them. Deployment requires fully green CI on the exact merged commit.

## Completed in source

1. **Reproducibility:** source-backed Python CSV command displayed on the desktop hero, a copy control, and dedicated [backend](../examples/backend/README.md) and [SQL](../examples/sql/README.md) setup/test guides.
2. **Lab mobile UX:** accessible result regions with live updates; native desktop table with caption; narrow-screen data presented as readable definition-list cards instead of hiding the last table column.
3. **EN/ES continuity:** language switches in the standalone Cases/Labs pages preserve the active hash section; exact Spanish labels replace untranslated no-JS links.
4. **Technical SEO:** canonical-only sitemap (10 URLs), section-specific x-default alternates, non-indexable legacy aliases, truthful localized WebPage/ProfilePage JSON-LD, and a predictable English-only unlocalized root alias.
5. **Evidence taxonomy:** three public runnable/source examples, one reported completed customer-work case without public references, and three private/unreleased work examples.
6. **Hiring:** 44px minimum targets for content/social links; remote availability and Uruguay UTC−3 noted in the recruiter brief; no fabricated results or conversions.
7. **Quality:** updated Node and Chrome checks for translations, accessibility, case taxonomy, mobile cards, canonical metadata, README instructions and deep-link navigation.

## Actions that remain owner-controlled

### GitHub account and About panel

The account browser was not signed in, so these profile/account changes were **not made**. Once signed in:

- [Profile settings](https://github.com/settings/profile): Name `Alerson Morales`; Bio `Software Developer | Python automation, APIs, React/Next.js & SQL | Founder of VYRA | Remote from Uruguay`; Website `https://natanaelprogimo-afk.github.io/portfolio/en/`.
- [Portfolio repository](https://github.com/natanaelprogimo-afk/portfolio): About description `Alerson Morales — Python, API, React/TypeScript and SQL engineering portfolio with bilingual case studies and reproducible public examples`; Website `https://natanaelprogimo-afk.github.io/portfolio/en/`.
- Optional: create the public profile repository `natanaelprogimo-afk/natanaelprogimo-afk` and copy [profile README](GITHUB_PROFILE_README.md) into its root `README.md`. This must be created through your own authenticated GitHub account.

The browser inspection found **no authenticated session**; do not claim profile settings are fixed. Profile: https://github.com/natanaelprogimo-afk.

### Real customer references

The two reported completed websites still require written publication authorization before client names, URLs, screenshots, testimonials or performance metrics can be included. Until then, retain accurate project statements and the explicitly labeled incomplete proof.

### Manual quality review

Automated axe-core A/AA checks do not certify WCAG compliance. Human keyboard and assistive-technology walkthroughs (NVDA/VoiceOver), zoom and contrast at all states and real field Core Web Vitals remain separate checks. Do not invent outcomes or a 100% audit score.

### Analytics

No trackers or cookies were added without consent. Any future privacy-respecting click or visitor measurement should be configured intentionally and validated against real data; current conversion rates are unknown.

## Release gate

- `npm run build`, `npm run lint`, `npm test`, all Python examples.
- `scripts/browser.e2e.mjs` with 320/390/768/1366px and data-specific checks.
- `scripts/accessibility.e2e.mjs` on all ten localized pages.
- `GITHUB_PAGES=true npm run build`, `npm run test:smoke`, `npm run test:integrity`.
- Inspect CI-generated Chrome captures. Merge only exact checked PR head SHA and confirm deploy on the resulting main SHA.
