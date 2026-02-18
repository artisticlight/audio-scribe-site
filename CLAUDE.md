# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Marketing and documentation website for **Audio Scribe** (name will change), an iOS/macOS voice transcription app by **Artistic Forge**. Built with Astro 5 + Tailwind CSS 4. Deployed to GitHub Pages via GitHub Actions.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally
- `npm run check` — Astro type checking

No test runner configured yet. No linter configured yet.

## Architecture

**Astro 5 static site** — zero JS by default, opt-in via `<script>` tags in components. Pages are `.astro` files, content is Markdown via content collections.

**Centralized branding config** — `src/config.ts` exports `SITE` (frozen object with app name, company, emails, URLs) plus derived helpers (`hasAppStoreUrl`, `ctaUrl`, `ctaLabel`). The app name WILL CHANGE — never hardcode it, always use `SITE.appName`.

**Content collections** — defined in `src/content.config.ts`. Collections: `docs`, `changelog`, `tutorials`, `legal`. Markdown files live under `src/content/en/<collection>/`. Dynamic routes in `src/pages/docs/[...slug].astro` and `src/pages/legal/[...slug].astro`.

**Layouts** — `BaseLayout.astro` (HTML shell, header, footer, fonts), `DocsLayout.astro` (sidebar + prose styling for Markdown content).

**Components** — `Header.astro` (floating nav with mega menu + mobile drawer), `Footer.astro` (template-style footer with ivory background), `VoiceWaveform.astro` (SVG + GSAP animation).

**Tailwind CSS 4** — uses `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind`). Design tokens defined in `src/styles/global.css` via `@theme` block. Colors, typography, and shadows match the Nexsas template.

**i18n** — configured in `astro.config.mjs` (en default, es, fr). English is unprefixed (`/`), others are prefixed (`/es/`, `/fr/`). Translation utilities in `src/i18n/utils.ts` export `getTranslations(locale)`, `localePath(locale, path)`, and `collectionName(base, locale)`. UI strings live in `src/i18n/{en,es,fr}.json`. Locale pages under `src/pages/{es,fr}/` mirror the English routes, hardcoding their locale and using relative imports. Content collections are locale-suffixed (`docs`, `docs_es`, `docs_fr`, etc.) with Markdown in `src/content/{en,es,fr}/<collection>/`. The Header includes a language switcher (desktop dropdown + mobile pills).

## Deployment

GitHub Pages at `https://artisticlight.github.io/audio-scribe-site/`. Astro config: `site: 'https://artisticlight.github.io'`, `base: '/audio-scribe-site/'`. All internal links must use `import.meta.env.BASE_URL` prefix.

## Styling

- **Tailwind CSS 4** with design tokens from the Nexsas template
- Font: Inter Tight (Google Fonts)
- Key colors: `--color-hero: #BFAB9A` (warm beige), `--color-secondary: #1a1a1c`, `--color-accent: #fcfcfc`, `--color-ns-ivory: #f4efe7`
- Light mode only — no dark mode
- Hero section uses `bg-secondary` with video overlay
- Inner pages use `bg-background-3` (#f4f5f8)
- Shadow scale: `shadow-1` (subtle) through `shadow-6` (dramatic)
- Respect `prefers-reduced-motion` for animations

## Conventions

- All `<nav>` landmarks must have unique `aria-label` attributes
- External `target="_blank"` links include `rel="noopener noreferrer"`
- Images include `width`/`height` to prevent CLS; `loading="lazy"` for below-fold
- GSAP animations loaded only where needed (VoiceWaveform component)
- Pages under `src/pages/` follow the route structure: `/docs/*`, `/legal/*`, `/knowledge/*`, `/support`, `/about`
