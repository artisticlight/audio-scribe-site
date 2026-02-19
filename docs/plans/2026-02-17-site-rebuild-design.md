# Audio Scribe Site Rebuild — Design Document

**Date:** 2026-02-17 (revised 2026-02-18)
**Company:** Artistic Forge
**App Name:** Audio Scribe _(placeholder — will change; centralized in `src/config.ts`)_
**Template Reference:** [Nexsas HTML/Tailwind Template](https://themeforest.net/item/nextsaas-saas-software-startup-tailwind-template/59358848)
**Live Reference:** [next-sass-html.vercel.app](https://next-sass-html.vercel.app/)
**Revision Note:** Merged from original design + Codex review. Incorporates deployment config, i18n model, accessibility contract, CTA fallback, CI gates, and performance policy from Codex. Retains full animation stack (GSAP + ScrollTrigger + Lenis + Springer) per owner requirement to match template feel exactly.

---

## 1. Overview

Complete rebuild of the Audio Scribe marketing and documentation site. Replaces the current Angular/Material implementation with Astro + Tailwind CSS, using the Nexsas template as the design foundation. Goal: premium, warm editorial aesthetic that distinguishes Audio Scribe from competitors' generic tech-focused sites.

The app is an iOS/macOS voice transcription tool available on the Apple App Store. The site promotes the app, provides documentation, and houses legal/compliance pages.

---

## 2. Tech Stack

| Layer      | Choice                                      | Rationale                                                                      |
| ---------- | ------------------------------------------- | ------------------------------------------------------------------------------ |
| Framework  | **Astro 5** (SSG)                           | Purpose-built for content/marketing sites. JS only via interactive islands.    |
| Styling    | **Tailwind CSS 4**                          | Utility-first, matches template source directly.                               |
| Content    | **Markdown / MDX**                          | Docs, release notes, tutorials authored as `.md` files.                        |
| i18n       | **Astro i18n routing**                      | English default (`/`), Spanish (`/es/`), French (`/fr/`).                      |
| Deployment | **GitHub Pages** via GitHub Actions         | `astro build` output deployed on push to `main`.                               |
| Animations | **GSAP + ScrollTrigger + Lenis + Springer** | Full template animation stack. CSS where sufficient, GSAP for complex effects. |

### Routing and Deployment Base

Astro config must set:

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://artisticlight.github.io',
  base: '/audio-scribe-site/',
  // ...
});
```

Localized routes:

- English: `/audio-scribe-site/`
- Spanish: `/audio-scribe-site/es/`
- French: `/audio-scribe-site/fr/`

---

## 3. Project Structure

```text
src/
  components/        # Reusable UI (Navbar, MegaMenu, Footer, FeatureCard, etc.)
  layouts/           # Page shells (BaseLayout, DocsLayout)
  pages/             # Route pages (index.astro, about.astro, etc.)
    docs/            # Documentation sub-pages
    legal/           # Privacy, terms, GDPR, security
    knowledge/       # Use cases, analytics, changelog
  content/           # Markdown content, per locale
    en/              # English content
      docs/
      changelog/
      tutorials/
      legal/
    es/              # Spanish content
      docs/
      changelog/
      tutorials/
      legal/
    fr/              # French content
      docs/
      changelog/
      tutorials/
      legal/
  i18n/              # UI string translation files (en.json, es.json, fr.json)
  styles/            # Global CSS, Tailwind config, animation utilities
  config.ts          # Centralized app name, company, emails, URLs
public/              # Static assets (logo, images, hero video, fonts, favicons)
```

---

## 4. Centralized Configuration

Single source of truth for branding. App name change requires editing one file.

```ts
// src/config.ts
export const SITE = {
  appName: 'Audio Scribe',
  companyName: 'Artistic Forge',
  supportEmail: 'support@audioscribe.app',
  privacyEmail: 'privacy@audioscribe.app',
  appStoreUrl: '',
  launchUpdatesUrl:
    'mailto:support@audioscribe.app?subject=Notify%20me%20when%20Audio%20Scribe%20launches',
  social: { twitter: '', facebook: '', instagram: '' },
  logoPath: '/assets/logo.png',
  appStoreBadgePath: '/assets/app-store-badge.svg',
} as const;
```

### CTA Fallback Behavior

- If `appStoreUrl` is populated: all CTAs show "Get it on the App Store" linking to the listing.
- If `appStoreUrl` is empty: all CTAs show "Get Launch Updates" using `launchUpdatesUrl` (mailto waitlist).
- Implemented via a shared helper or component that checks config once.

---

## 5. Visual Design Language

### Aesthetic: Warm Editorial Luxury

Not dark tech. Warm, organic, premium — like a high-end creative agency. Light mode only, no dark mode.

### Color System

| Token           | Value                  | Usage                                                          |
| --------------- | ---------------------- | -------------------------------------------------------------- |
| Hero background | `#BFAB9A`              | Hero section fill, warm beige/champagne                        |
| Body background | `#FFFFFF`              | Primary content areas                                          |
| Page background | `#F5F5F8`              | Inner pages (docs, support, about, legal)                      |
| Accent          | `#BFAB9A` + variations | Highlighted words, decorative elements, badges                 |
| Dark cards      | `#1A1A1A` / near-black | Contact cards, emphasis blocks                                 |
| Text primary    | `#1A1A1A`              | Body text on light backgrounds                                 |
| Text on hero    | `#FFFFFF`              | Text overlaid on hero and dark surfaces                        |
| Trust column bg | `~#F5F3EF`             | Warm-tinted background for Trust & Compliance mega menu column |

### Typography

- **Headings:** Inter Tight (Google Fonts) — weights 100-900, regular + italic
- **Body:** Inter Tight (same family, lighter weights for body)
- **Responsive sizing:** `text-4xl` mobile, `text-6xl` desktop for hero headlines
- **Loading:** Preconnect to Google Fonts, subset to used weights only

### Border Radius

- Cards: `rounded-3xl` (24px)
- Buttons: `rounded-full` (pill shape)
- Containers: `rounded-2xl`
- Icon wrappers: `rounded-xl`

### Spacing

- Generous whitespace between sections (`py-20` to `py-32`)
- Content never feels cramped
- Tailwind default spacing scale

---

## 6. Animation Policy

### Stack

Full template animation stack, delivered as Astro interactive islands:

- **GSAP** — core animation engine (waveform, complex reveals)
- **ScrollTrigger** — scroll-based animation triggers
- **Lenis** — smooth scroll feel
- **Springer** — spring easing curves

### Categories (all respect `prefers-reduced-motion`)

1. **Scroll-triggered reveals** — elements fade up with spring easing as they enter viewport via ScrollTrigger. Uses `[data-ns-animate]` attribute system from template.
2. **Hover micro-interactions** — cards lift with shadow intensification, buttons scale subtly. CSS transitions where possible.
3. **Hero animations** — two signature elements:
   - **3D organic sphere clusters:** `big-circle.mp4` video, autoplay muted loop on all devices.
   - **Audio waveform:** 120+ SVG bar elements animated independently with GSAP sine wave patterns.

### `prefers-reduced-motion` Behavior

When enabled, disable:

- Scroll reveal transitions (elements appear immediately)
- Hero waveform animation (show static bars)
- Hero video (show poster frame)
- Non-essential hover motion

### Dark Cards with Aurora Gradients

Contact/emphasis cards use near-black backgrounds with warm gradient overlay effects (peach, amber, rose blobs).

### Warm Gradient Blob Accents

Documentation category cards feature soft warm-toned gradient blobs in corners.

---

## 7. Performance Policy

### Budgets

- Home route JS (gzip): <= 90 KB
- Any route total JS (gzip): <= 140 KB
- Largest image: <= 250 KB optimized

### Hero Media Strategy

- Ship original `big-circle.mp4` at full quality (6.8 MB) — no lossy compression to preserve visual fidelity
- Provide WebM version (naturally smaller at same quality) for browsers that support it
- Set poster frame for instant first paint before video loads
- Autoplay on all devices (muted autoplay is browser-allowed)
- `prefers-reduced-motion`: show poster only, no video
- Revisit compression only if real-world loading tests warrant it

### Asset Handling

- Responsive images via `<picture>` or Astro image pipeline
- Prefer inline SVG components over the template's custom icon font where practical
- Fonts: Inter Tight only, preconnect and subset

---

## 8. Navigation

### Top-Level Nav

| Position | Item                    | Type                                                   |
| -------- | ----------------------- | ------------------------------------------------------ |
| Left     | Logo + App Name         | Home link                                              |
| Center   | Product                 | Dropdown _(placeholder — TBD)_                         |
| Center   | Resources               | **Mega menu** (see below)                              |
| Center   | Company                 | Dropdown _(placeholder — TBD)_                         |
| Right    | Get it on the App Store | Pill CTA button (or "Get Launch Updates" per fallback) |

### Resources Mega Menu

Three-column dropdown matching Nexsas layout. Smooth slide-down animation with backdrop blur.

**Column 1 — Help & Documentation** _(white background)_

| Item          | Icon             | Description                                  |
| ------------- | ---------------- | -------------------------------------------- |
| Documentation | doc-add icon     | Detailed documentation of the product.       |
| Tutorials     | chat-bubble icon | Step-by-step guides to help you get started. |
| FAQ           | question icon    | Frequently asked questions and answers.      |
| Support       | headset icon     | Get help and support from our team.          |

**Column 2 — Knowledge & Research** _(white background)_

| Item      | Icon           | Description                                                       |
| --------- | -------------- | ----------------------------------------------------------------- |
| Use Cases | lightbulb icon | Explore real-world scenarios where Audio Scribe delivers results. |
| Analytics | chart icon     | Dive into performance metrics and data insights.                  |
| Changelog | update icon    | Stay updated with the latest changes and improvements.            |

**Column 3 — Trust & Compliance** _(warm-tinted background ~#F5F3EF)_

| Item               | Icon              | Description                     |
| ------------------ | ----------------- | ------------------------------- |
| Security           | shield-check icon | How we protect your data.       |
| GDPR Compliance    | person-lock icon  | EU data protection compliance.  |
| Privacy Policy     | shield icon       | How we handle your information. |
| Terms & Conditions | dollar icon       | Terms of service.               |

### Mobile Navigation

Hamburger opens full-screen drawer. Categories as expandable accordion sections. Touch-friendly tap targets (minimum 44px).

---

## 9. Accessibility Contract

Required acceptance criteria for all interactive components:

- Keyboard-operable navigation, mega menu, and mobile drawer
- Visible focus indicators across all interactive controls
- Mega menu: `aria-expanded`, `aria-controls`, proper role semantics
- `Esc` closes open menus and drawers
- All icon-only controls have accessible names (`aria-label`)
- Contrast: WCAG AA for body text and actionable UI
- `prefers-reduced-motion` respected for all animations
- Touch targets: minimum 44px on mobile

---

## 10. Information Architecture

### Routes

```text
/                           Home
/docs/                      Documentation landing
/docs/getting-started/      Getting Started
/docs/features/             Features deep dive
/docs/faq/                  FAQ
/docs/tutorials/            Tutorials (YouTube embeds)
/docs/release-notes/        Release Notes
/support/                   Support
/about/                     About Artistic Forge
/legal/privacy/             Privacy Policy
/legal/terms/               Terms & Conditions
/legal/security/            Security
/legal/gdpr/                GDPR Compliance
/knowledge/use-cases/       Use Cases
/knowledge/analytics/       Analytics
/knowledge/changelog/       Changelog
```

Localized equivalents under `/es/` and `/fr/`.

---

## 11. Pages

### 11.1 Home Page

**Hero** — full viewport height. `#BFAB9A` background.

- 3D organic sphere video (`big-circle.mp4`) framing both sides, autoplay muted loop
- Small pill badge: "Now on the App Store" (or "Coming Soon" per CTA fallback)
- Headline: **"Voice captured with precision."**
- Subtitle: on-device AI transcription for Mac, iPad, and iPhone
- Two pill CTAs: "Get it on the App Store" (white filled) | "Learn More" (translucent)
- Audio waveform SVG animation pulsing at bottom edge (GSAP)

**Trust strip** — white background.

- Three inline badges: "100% On-Device Option" | "End-to-End Encrypted" | "Zero Data Collection"

**Features** — 3-up card grid on white.

- On-Device AI Processing
- iCloud Sync
- Cloud Model Support (latest models for opt-in users)
- Cards with warm gradient blob accents in corners
- Placeholder icons

**Platform showcase** — device mockup section.

- Mac, iPad, iPhone frames with placeholder areas for screenshots
- Brief copy per device

**CTA** — warm beige background section.

- "Ready to get started?"
- App Store badge button (or waitlist CTA per fallback)

### 11.2 Documentation Landing

Light gray background (`#F5F5F8`).

- "Welcome to Audio Scribe Documentation" headline
- Two category cards at top with warm gradient blob accents: "Getting Started" and "Features"
- Categorized sections below with bullet-point links
- Sub-pages rendered from Markdown/MDX content collections
- Desktop: sidebar navigation with active state
- Mobile: sidebar collapses to dropdown

**Documentation sub-pages:**

- Getting Started
- Features (deep dive)
- FAQ (expandable accordion items)
- Tutorials (grid of YouTube video cards with thumbnails)
- Release Notes (reverse-chronological, version + date + Markdown content)

### 11.3 Support

Light gray background.

- "Reach out to our support team for help." headline
- Left: stacked dark cards with warm aurora gradient accents — Email Us, Documentation link, App Store link
- No contact form (email links without backend)
- Below: compact Quick Help FAQ section

### 11.4 About

Light gray background.

- "Crafted by Artistic Forge" headline
- Mission statement section (placeholder copy)
- Three value cards: "Privacy First", "On-Device Intelligence", "Apple Ecosystem Native"
- CTA with App Store button

### 11.5 Legal Pages (Security, GDPR, Privacy Policy, Terms & Conditions)

Clean typographic pages. White content area on light gray background. Each rendered from Markdown content collections. "Last updated" date from frontmatter.

### 11.6 Knowledge Pages (Use Cases, Analytics, Changelog)

- **Use Cases:** showcase cards for meetings, lectures, interviews, audio files, dictation
- **Analytics:** placeholder for usage metrics/insights (content TBD)
- **Changelog:** reverse-chronological release notes from Markdown files

---

## 12. i18n Strategy

### UI Strings

JSON dictionaries at `src/i18n/{en,es,fr}.json`. Imported and resolved at build time. No runtime translation layer.

### Content

Per-locale content collections:

- `src/content/en/docs/`, `src/content/es/docs/`, `src/content/fr/docs/`
- Same structure per locale

### Missing Content Behavior

- Required pages (home, docs landing, legal): CI blocks build if locale content is missing.
- Optional pages (individual tutorials, changelog entries): fall back to English if locale version doesn't exist.

---

## 13. Responsive Design

Mobile-first throughout. Single-column layouts below 768px.

| Breakpoint | Layout                                          |
| ---------- | ----------------------------------------------- |
| < 640px    | Single column, hamburger nav, stacked cards     |
| 640-768px  | Two-column grids where appropriate              |
| 768-1024px | Sidebar nav appears in docs, three-column grids |
| > 1024px   | Full desktop layout, mega menu dropdowns        |
| > 1440px   | `lp:` breakpoint from template for wide layouts |

Touch-friendly tap targets (44px minimum). No hover-dependent interactions on mobile.

---

## 14. Content Authoring

Documentation, release notes, tutorials, and legal pages are Markdown files with YAML frontmatter:

```md
---
title: 'Getting Started'
description: 'Set up Audio Scribe on your Apple devices'
lastUpdated: 2026-02-17
---

# Getting Started

Audio Scribe is available on the Apple App Store...
```

Adding content = dropping a `.md` file in the correct locale directory. No code changes required.

---

## 15. CI/CD Quality Gates

GitHub Actions workflow (runs on PR to `main` and push to `main`):

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test` (if tests exist)
5. `npm run build`
6. Internal link check for localized pages
7. Deploy to GitHub Pages (push to `main` only)

---

## 16. Template Assets & Dependencies

**Template location:** `nexsas-template/main-v2.1.2/` (relative to project parent)
**Demo variant:** `ai-voice-generator` (all files prefixed with this)

### Animation Dependencies (include in project)

- **GSAP** (`public/vendor/gsap.min.js`) — core animation engine
- **ScrollTrigger** (`public/vendor/scroll-trigger.min.js`) — scroll-based animation triggers
- **Lenis** (`public/vendor/lenis.min.js`) — smooth scroll
- **Springer** (`public/vendor/springer.min.js`) — custom spring easing

### Assets to Extract

- [ ] Hero video: `public/video/big-circle.mp4` (6.8 MB) — ship full quality, provide WebM variant
- [ ] Waveform SVG: `src/components/pages/ai-voice-generator/hero-voice.htm` — 120+ bar SVG
- [ ] Waveform animation: `src/js/animation/voice-waveform.js` — GSAP sine wave pattern
- [ ] Scroll reveal system: `src/js/common/reveal-elements.js` — `[data-ns-animate]` attributes
- [ ] Mega menu structure: `src/components/pages/ai-voice-generator/resources-menu.htm`
- [ ] Header/nav: `src/components/pages/ai-voice-generator/header.htm`
- [ ] Mobile menu: `src/components/pages/ai-voice-generator/mobile-menu.htm`
- [ ] Footer: `src/components/pages/ai-voice-generator/footer.htm`
- [ ] Icon font: `public/fonts/next-sass.*` — custom icon set (evaluate SVG alternatives)
- [ ] Design tokens: `src/styles/variables.css` — colors, shadows, typography scale
- [ ] Card/hover animations from `src/js/common/common.js`
- [ ] Navigation animations from `src/js/animation/navigation-menu.js`

### Font

- **Inter Tight** (Google Fonts) — weights 100-900, regular + italic. Preconnect, subset.

### No dark mode — light only

### Key Page Components (in `src/components/pages/ai-voice-generator/`)

| Page            | Component File                                             |
| --------------- | ---------------------------------------------------------- |
| Home hero       | `hero.htm` + `hero-voice.htm`                              |
| Documentation   | referenced from `ai-voice-generator-documentation.html`    |
| Support/Contact | referenced from `ai-voice-generator-support.html`          |
| About           | referenced from `ai-voice-generator-about.html`            |
| FAQ             | referenced from `ai-voice-generator-faq.html`              |
| Security        | referenced from `ai-voice-generator-security.html`         |
| GDPR            | referenced from `ai-voice-generator-gdpr.html`             |
| Privacy         | referenced from `ai-voice-generator-privacy-policy.html`   |
| Terms           | referenced from `ai-voice-generator-terms-conditions.html` |
| Changelog       | referenced from `ai-voice-generator-changelog.html`        |
| Tutorials       | referenced from `ai-voice-generator-tutorial.html`         |
| Use Cases       | referenced from `ai-voice-generator-use-case.html`         |
| Analytics       | referenced from `ai-voice-generator-analytics.html`        |

---

## 17. Implementation Sequence

1. **Scaffold Astro project** — Tailwind, i18n routing, `config.ts` with CTA fallback, base layout, `site`/`base` config
2. **Port template assets** — extract animations, design tokens, fonts, hero video (compress), waveform SVG/JS
3. **Build navigation** — navbar with mega menu, mobile drawer, accessibility (keyboard, ARIA, Esc)
4. **Build home page** — hero with video + waveform, trust strip, features, platforms, CTA
5. **Build docs layout** — sidebar, Markdown content collections, sub-pages
6. **Build inner pages** — support, about, legal pages, knowledge pages
7. **Add i18n** — per-locale content collections, JSON UI string dictionaries
8. **Mobile polish** — responsive testing across breakpoints, touch targets
9. **Performance tuning** — video compression, responsive images, JS budget check
10. **CI/CD** — lint, typecheck, build, link check, GitHub Pages deploy
