# VYRA | Responsive Layout Repair - WordPress child-theme scaffold

Independent, AI-assisted educational demonstration on **fictional** content.

## Evidence status (2026-11-07)

- Static HTML/CSS fixture: Chromium checks at **320, 390, 768 and 1366 px** passed without horizontal overflow. The intentionally broken version overflows at 390 px (1060px document width).
- PHP syntax: \`php -l functions.php\` passes.
- WordPress hook wiring: an isolated PHP **mock** for \`add_action\`, \`wp_enqueue_style\`, and \`wp_get_theme\` passes.
- **NOT TESTED**: the child theme running inside a real WordPress installation. No client website, live production deployment, WordPress compatibility claim, or paid customer result.

## What is in this folder

- \`style.css\`: metadata for an educational Twenty Twenty-Five child-theme scaffold.
- \`functions.php\`: registers \`fixed.css\` on \`wp_enqueue_scripts\`.
- \`fixed.css\`: layout corrections for a specifically structured HTML fixture, not generic fixes for all WordPress themes.

The related reproducible HTML fixture, broken CSS, browser test, and Chromium screenshots are packaged in the VYRA Fiverr case-study ZIP delivered to the owner. This folder alone is **not a production-ready WordPress theme** because selectors must be adapted to the target site's markup and tested against actual WordPress runtime.

## Next verification steps

1. Install a staging WordPress instance.
2. Activate Twenty Twenty-Five and this child theme with suitable fixture content.
3. Check that \`fixed.css\` loads, evaluate the page at 320/390/768/1366 px.
4. Capture screenshots of a real WordPress page and test report; publish as evidence **only after** successful validation.

No external credentials are bundled.
