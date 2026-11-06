# V15 — technical accuracy, accessibility and recruiter evidence

**Scope:** only the public portfolio code, bilingual resumes, engineering demonstrations and release workflow. No private customer accounts or products were edited.

## Changes implemented

1. The browser CSV comparison now uses exact, bounded integer cents and rejects unsafe monetary amounts.
2. Idempotency signatures canonicalize nested JSON objects. The in-memory demo has a 500-key limit.
3. Laboratory markup is generated from explicit EN/ES data, rather than translating JavaScript with global string replacements. Error codes and user-visible responses are translated separately.
4. Lab tabs synchronize with URL history. The VYRA trust language switch retains the selected section.
5. An independent public laboratory case joins the case-study library (four public examples, one reported client experience, three private projects). SQLite examples accurately disclose their in-memory state.
6. EN/ES resumes have semantically structured HTML routes and downloadable PDFs with tagged text, logical reading order, document info and corrected hyperlinks to localized portfolio routes.
7. The unlocalized root offers a usable no-JavaScript gateway and stable canonical English metadata.
8. Mobile visitors can access and copy the exact Python CLI command, with accessible feedback and selectable fallback if copying is denied.
9. A public skills-to-evidence matrix separates code evidence, owner-reported customer experience and private or unreleased development.
10. Context-specific social previews for case studies, hiring and VYRA trust are original SVGs with PNG rasterization when supported.
11. CI is pinned to audited immutable GitHub Action SHAs, with extra regressions on money arithmetic, idempotency, languages, résumé links, mobile, errors and dynamic accessibility.

## Release conditions

- GitHub Actions quality suite and GitHub Pages production output must both pass on the exact commit.
- Verify the public English and Spanish URLs, case anchors, resumes, mobile labs and social previews after publication.
- Automated accessibility checks and semantic PDF structure are **not** PDF/UA or WCAG certifications. Human NVDA/VoiceOver and zoom testing remains necessary.

## Tasks requiring account access, real evidence, or explicit choice

- GitHub account profile name/bio/website and repository About still require an authenticated settings interface. The repo description publicly says 'Natael' until changed. A prepared profile README exists at docs/GITHUB_PROFILE_README.md.
- References, screenshots and actual results of the two completed customer websites require client permission. None are fabricated here.
- Genuine field Core Web Vitals and conversion statistics require traffic and a consciously selected privacy-compliant measurement approach. No tracker was silently added.
- Public demos do not independently prove production usage of FastAPI, Next.js, React Native/Expo, C#, Java, PHP or external databases. See docs/SKILLS_EVIDENCE_MATRIX.md.
- LinkedIn/Upwork may block automated crawlers. HTTP 403/999 is not proof a publicly visible account link is broken.

## Primary source files

- scripts/render-cases.mjs; scripts/render-labs.mjs
- public/labs/logic.mjs; public/labs/i18n.mjs
- scripts/build-resumes.mjs; scripts/build-resume-pages.mjs
- scripts/accessibility.e2e.mjs; scripts/browser.e2e.mjs
- docs/SKILLS_EVIDENCE_MATRIX.md