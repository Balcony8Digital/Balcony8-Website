# Balcony8 — Website

Static "under construction" page for Balcony8 Brand Buro, built from the Figma file **B8BB Landing Page** (desktop 1728×1117, mobile 390×844).

- `index.html` — markup
- `styles.css` — layout (desktop scales from the 1728px frame; mobile below 768px follows the 390px frame)
- `assets/` — emboss backgrounds, Balcony8 wordmark

## Fonts
The design uses **Hot Mess** (headline) and **Eleven Eleven** (body). Both ship as woff2 in `/fonts` (converted from the supplied TTFs) and load via `@font-face` in `styles.css`.

## Run locally
Any static server works, e.g. `python3 -m http.server`.
