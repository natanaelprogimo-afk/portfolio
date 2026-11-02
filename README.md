# Alerson Morales — developer portfolio

A recruiter-first, bilingual (English / Spanish) portfolio built with **React, TypeScript, Vite, and accessible CSS**.

**Deployment status:** source code is public. GitHub Pages must be enabled in repository settings before the advertised Pages URL can be considered live.

## Purpose

A recruiter or engineering manager should quickly understand who Alerson is, which projects are completed, what engineering problems he has worked on, and how to contact him.

The content avoids invented customer testimonials, production metrics, business results, demo links, and screenshots.

## Start locally

Requires Node.js 22.12 or later.

    npm ci
    npm run dev

## Quality gates

    npm run build
    npm run lint

GitHub Actions runs these on pull requests and changes to main.

## Publish on GitHub Pages

1. Open repository Settings > Pages.
2. Under Build and deployment, select GitHub Actions as the source.
3. Merge a validated pull request into main. The deploy workflow builds with GITHUB_PAGES=true, producing the correct /portfolio/ prefix.
4. Inspect the deployment run and verify the live site in mobile and desktop views.

For a custom domain or root-hosted site, adjust the Vite base and canonical URL.

## Maintain content

- Contact and social links: src/App.tsx
- English and Spanish text: src/App.tsx
- Project evidence, current statuses and technology tags: src/data/projects.ts
- Styling: src/index.css
- Search and social metadata: index.html
- Branding: public/favicon.svg
- Public printable résumé (without national ID): public/resume.html

## Evidence policy

Only the Developer Portfolio case study links to publicly inspectable source code. Other codebases are private. Client website completions are described without invented URLs, endorsements, or performance figures.

New claims about product releases, measured impact or certifications require evidence before publication. The résumé is a publicly shareable HTML page with print-to-PDF support; the original PDF with an identity number has not been committed.

## Accessibility and privacy

The website includes semantic landmarks, a skip link, focus states, accessible navigation, keyboard-operated project filters, responsive design, and reduced-motion support. There are no cookies, trackers, external fonts, analytics, third-party forms, or exposed credentials.

## Ownership

Portfolio design and engineering for Alerson Morales. Other projects retain their separate ownership and license arrangements.
