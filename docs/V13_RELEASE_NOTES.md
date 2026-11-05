# V13 — design, evidence and accessibility release notes

**Scope:** public engineering portfolio only. No private VYRA source, customer information, real-client images or unverifiable commercial metrics were added.

## Completed implementation

1. **Recruiter-first evidence:** three inspectable technical cases (Python CSV, localhost HTTP/SQLite, React/TypeScript), linked from the homepage evidence cards and the hiring brief.
2. **Bilingual case content:** structured English and Spanish case descriptions with explicit limitations. Spanish contact subjects and navigation are authored by locale, not translated by brittle HTML replacement.
3. **Professional experience:** four distinct non-public/client case sections (two completed websites, internal catalog comparison prototype, private automation effort, unreleased VYRA Fitness) with honest status and limitations.
4. **Accessible navigation:** one CSS contract for 44px minimum secondary header links across Cases, Labs, Hiring and Trust; visible focus and reduced-motion fallback.
5. **Sharing and SEO:** OG locale and alternate locale, Twitter title/description/image/alt on EN/ES routes; consistent client/server home descriptions.
6. **Visual system:** case study layout with reusable panels, code command, technical tags, clearly labeled public/private status, resilient mobile reflow.
7. **Quality automation:** source-based tests of all seven case IDs, language scopes, reachable stylesheets, social metadata, mobile link dimensions/overflow at 320, 390 and 768px, and axe-core analysis of ten routes.
8. **Performance hygiene:** maintained static JS/CSS/social image budgets without introducing analytics pixels or external frontend services.
9. **Release verification:** root React main element includes `data-release="v13"` and CI validates the full output before merging.

## Validated by CI (not independently certified)

- TypeScript build, oxlint, Python unittest, Node unit and smoke suites.
- Playwright Chrome interaction tests (language, keyboard, cases, links, mobile widths).
- Automated axe-core WCAG A/AA checks on EN/ES home, cases, labs, hiring and trust.
- GitHub Pages link, asset and SEO integrity budgets.

**Important:** Automated axe success is not a WCAG certificate, and simulated/browser test results do not replace field Core Web Vitals.

## Items that cannot be completed responsibly from this repository

- **Two client websites:** collect permission and authentic screenshots, original URLs where disclosable, and any measured results before adding public media, client names or testimonials.
- **Private VYRA products:** owner's publication authorization, security review and verifiable results before advertising releases or commercial demand.
- **GitHub account public profile:** GitHub user name/bio/website/About metadata and creation of profile README repository require a compatible account-settings writer; the GitHub connector used for source changes does not expose those writes. Draft profile text already exists under `docs/GITHUB_PROFILE_README.md`.
- **Human assistive technology:** validate with NVDA/VoiceOver users and manual zoom/keyboard testing before any assertion of full WCAG conformance.
- **Real traffic, search and conversion outcomes:** only after the owner chooses privacy-compatible analytics and enough real user activity is observed.
- **External Upwork/LinkedIn behavior:** automated checks of those sites can return HTTP 403/405; verify links manually in a signed-in browser.

## Recommended release acceptance

- CI fully green on PR head.
- Inspect final screenshots for desktop, 320px and 390px.
- Merge using exact expected head SHA.
- Verify `main` contains the merge commit and GitHub Pages deploys the same successful quality run.
- Confirm public EN/ES cases and the `data-release` marker after deployment.

No claims of customer revenue, client adoption, performance guarantees or independent accessibility certifications should be added without source evidence.
