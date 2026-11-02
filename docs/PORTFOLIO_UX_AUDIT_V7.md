# Portfolio V7 — UX/UI, conversion and commercial trust audit

**Scope:** `natanaelprogimo-afk.github.io/portfolio/` English/Spanish, /labs, /cases, /hiring and /trust.  
**Date:** 2026-11-02.  
**Evidence:** inspected public GitHub main source at baseline commit `2456b94ead142c224e0646a571b91fd7248b4c0a` and existing automated Chrome/axe tests. Independent browser review completed on public /en/, /es/, /en/hiring/ and /en/trust/ using 1440, 390 and 320px viewports. Screenshots exist in the browser-run output, which is not a public artifact.  
**Commercial privacy boundary:** owner has described seven private SaaS/AI-agent products but has not approved publishing their details or claims. This audit does not create product listings.

## Executive diagnosis

V7 deliberately removes two duplicative homepage sections (the generic four-step approach block and repeated three-card lab teaser). The direct links to all three interactive lab examples remain in the condensed, accessible public evidence section. The more specific in-depth material is still available in /labs and /cases. This reduces long-scroll friction without removing the underlying examples.

The existing V6 foundation already has strong engineering evidence, multilingual URLs, a running browser lab, source-backed code examples, standalone recruiter/trust pages, automated CI, and a transparent private-versus-public distinction. It does not require a total redesign.

The measured public homepage length before V7 was approximately 8,100px desktop, 12,696px at 390px and 13,683px at 320px. The visual audit also verified no horizontal overflow at 390px and 320px, working skip link and Escape menu focus return. The strongest outstanding concern is **audience ambiguity**: the homepage primarily sells engineering credibility while simultaneously offering recruiter and buyer links as peers in a crowded social link row. Recruiters and potential SaaS buyers need different immediate questions answered.

### Priority-one changes implemented in V7 branch

The audit also found untranslated Spanish interface labels (`LAYER`, `BUILD WITH INTENT`, `EXAMPLE`, `ALERSON / ENGINEERING`), a bilingual contact heading on English hiring, and a long trust page without a table of contents. V7 replaces those labels, adds a project-status key, and adds six trust anchor links. A full professional copy-edit remains a separate editorial gate.

| Component | Baseline issue found from source | V7 implementation | Verification |
| --- | --- | --- | --- |
| Hero first actions | `#work` and `#evidence` both point recruiters into long page; buyer intent hidden among five links | Main actions: public proof and VYRA buyer due diligence; less redundant metadata | Chrome E2E tests on EN/ES |
| Buyer vs recruiter | No explicit choice path in homepage body | Accessible two-column bilingual visitor routes with distinct proof and transparency destinations | Two cards per locale, correct paths |
| Mobile reading and tap | Small auxiliary links and 39px footer icon controls | More legible action treatments, footer targets 44px, 44px minimum for language toggle | Existing mobile QA plus new routes checks |
| Responsible commercial positioning | Seven private SaaS/agents not approved for advertising | Buyer route points to existing trust center and explicitly states product information remains private | Copy review and link tests |
| Discoverability | SEO canonical and `hreflang` exist; professional `Person` structured data absent on localized homepages | Minimal truthful JSON-LD Person schema only | Smoke tests verifying schema and locality |
| LinkedIn | Connected browser returned connection error; user identity could not be verified | Preparation text for two Featured cards and dual-track headline; no LinkedIn account mutation | Apply only after authenticated owner access |

## User experience review — component by component

### 1. Visual hierarchy

- **Keep:** distinct dark technical aesthetic, accessible bright lime accent, visible main headline, independently verifiable code cards, clear disclosures.
- **Improve (implemented):** separate primary proof action and commercial trust CTA, remove duplicate trust link among minor social links, add an obvious decision point with descriptive buyer/recruiter benefits.
- **Further:** once original, authorized screenshots exist, use them instead of architecture-only placeholders on relevant projects. Do not create synthetic screenshots that look like real products.

### 2. Mobile, breakpoints and readability

- Test 320, 360, 390, 768, 1024, 1366 and 1920 CSS pixels, landscape mode and up to 200% text zoom; verify no clipping or horizontal scroll.
- All primary touch controls should target at least ~44x44px where practical. WCAG 2.2 AA criterion 2.5.8 establishes a 24x24 CSS pixel minimum with exceptions; 44x44 is an enhanced usability goal.
- Keep side-by-side route cards only when the viewport gives each adequate reading width; stack on mobile.
- Review header scroll offset when text zoom or mobile menu height changes.
- Do not mark contrast or zoom as fully certified until actual measurement across key states.

### 3. Accessibility and keyboard

- **Existing strengths:** skip links, meaningful landmarks, localized language, menu Escape close/focus restoration, reduced-motion CSS, automated axe checks.
- **V7:** higher focus visibility, larger navigation/footer targets and accessible route headings.
- **Remaining independent manual work:** NVDA/VoiceOver/TalkBack, 200% and 400% zoom, keyboard navigation at sticky-header offsets, high contrast modes, color-blind legibility and complex component announcements.
- Automated axe is a regression tool, not WCAG certification.

### 4. Commercial trust

- Make current proof distinguishable from private prototypes and product development.
- Do not present a trust checklist as if all the technical controls have been implemented in each private SaaS.
- Future product-specific buyer pages should show actual version, supported platforms, scope, real screenshots, data flow and privacy processing, AI permissions, error handling, actual terms, checkout and support only **after approval**.
- Never claim ISO 27001, SOC 2, pentest, 99.99% uptime, guaranteed savings or customer testimonials without evidence.
- Maintain a dated change log of the actual seven products privately, with release evidence and defects.

### 5. Evidence and projects

- Current technical cases primarily contain text and explicitly labelled conceptual diagrams.
- High-impact proof pack for each authorized case: 30–90 sec original walkthrough, sanitized screenshots, test run, source/architecture reference, known limitations, work status.
- The two completed client websites need actual links or permissioned proof. Do not invent client identity or domains.
- Show code provenance, actual test scope and setup commands so buyers/recruiters can reproduce outputs.

### 6. SEO and performance

- Existing Vite/React build and static generated localized pages should remain small; CI checks JS/CSS payload budgets.
- V7 adds JSON-LD person identity, not unverified business schema or Product/Offer entities.
- Run real Lighthouse/CrUX/PageSpeed mobile and desktop assessments separately. Target good Core Web Vitals at 75th percentile: LCP <= 2.5 seconds, INP <= 200 ms, CLS <= 0.1 per Google guidelines. Do not claim scores from source inspection.
- Verify Google Search Console/Bing indexing and that multilingual titles/canonicals refer to actual landing URLs.
- Review request caching/compression, lazy image loading and font loading when actual media is added.

### 7. Navigation and conversion

- Track two funnels distinctly (manually until analytics implementation and consent review):
  1. Recruiter: homepage → code/cases → hiring brief → résumé/contact.
  2. Buyer: homepage → trust center → real product evidence when approved → scoped inquiry → written offer.
- No dark patterns, fabricated urgency, misleading trust marks or invented reviews.
- Do not automatically install tracking pixels without a lawful/privacy review.

### 8. LinkedIn and cross-platform identity

- User authorized editing their LinkedIn. Browser access currently failed with `ERR_SOCKS_CONNECTION_FAILED`, so neither owner session nor fields could be verified and **no edits were made**.
- Prepare bilingual About, role-appropriate headline, a verified code link, the recruiter brief and buyer trust center as separate Featured entries.
- Retain genuine experience/dates and avoid publicly stating seven systems are already sold or released.
- GitHub repository About metadata and special profile README still require authenticated account administrative changes or a supported connector action.

## Next-phase acceptance criteria (not implied complete)

1. CI / Chrome succeeds for desktop and 320/390px; no serious/critical axe issues on all published routes.
2. User can clearly select both commercial and hiring paths within the first screen or immediate scroll.
3. LinkedIn changes saved only with authenticated owner session and verified before/after state.
4. First approved product has real proof, precise feature boundaries and explicit data/privacy/legal documents.
5. At least two authorized client case references or fully documented replacement proofs are published.
6. Independent performance/assistive-technology audits report measured scores and actual deficiencies.
7. Engagement is assessed from verified messages or inquiries, not fabricated traffic or conversion numbers.

## Sources and standards

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — focus visibility and target-size requirements.
- [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) — LCP, INP and CLS.
- [LinkedIn: edit Introduction](https://www.linkedin.com/help/linkedin/answer/a547248).
- [OWASP AI Agent Security](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html).

**Status:** V7 code improvements require GitHub Actions verification and public deployment before being considered shipped.
