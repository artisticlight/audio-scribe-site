# Audio Scribe Site Rebuild — Design Document

**Date:** 2026-02-17
**Company:** Artistic Forge
**App Name:** Audio Scribe *(placeholder — will change; centralized in `src/config.ts`)*
**Template Reference:** [Nexsas HTML/Tailwind Template](https://themeforest.net/item/nextsaas-saas-software-startup-tailwind-template/59358848)
**Live Reference:** [next-sass-html.vercel.app](https://next-sass-html.vercel.app/)

---

## 1. Overview

Complete rebuild of the Audio Scribe marketing and documentation site. Replaces the current Angular/Material implementation with Astro + Tailwind CSS, using the Nexsas template as the design foundation. Goal: premium, warm editorial aesthetic that distinguishes Audio Scribe from competitors' generic tech-focused sites.

The app is an iOS/macOS voice transcription tool available on the Apple App Store. The site promotes the app, provides documentation, and houses legal/compliance pages.

---

## 2. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Astro 5** (SSG) | Purpose-built for content/marketing sites. Zero JS by default. |
| Styling | **Tailwind CSS 4** | Utility-first, matches template source directly. |
| Content | **Markdown / MDX** | Docs, release notes, tutorials authored as `.md` files. |
| i18n | **Astro i18n routing** | English default (`/`), Spanish (`/es/`), French (`/fr/`). JSON translation files for static strings. |
| Deployment | **GitHub Pages** via GitHub Actions | Same as current setup. `astro build` → `dist/`. |
| Animations | **CSS keyframes + Intersection Observer** | Template animations ported directly. Respects `prefers-reduced-motion`. |

---

## 3. Project Structure

```
src/
  components/        # Reusable UI (Navbar, MegaMenu, Footer, FeatureCard, etc.)
  layouts/           # Page shells (BaseLayout, DocsLayout)
  pages/             # Route pages (index.astro, about.astro, etc.)
    docs/            # Documentation sub-pages
    legal/           # Privacy, terms, GDPR, security
  content/           # Markdown for docs, release notes, tutorials
    docs/
    changelog/
    tutorials/
  i18n/              # Translation JSON files (en.json, es.json, fr.json)
  styles/            # Global CSS, Tailwind config, animation utilities
  config.ts          # Centralized app name, company, emails, URLs
public/              # Static assets (logo, images, hero video/animation, favicons)
```

---

## 4. Centralized Configuration

Single source of truth for branding. App name change requires editing one file:

```ts
// src/config.ts
export const SITE = {
  appName: 'Audio Scribe',
  companyName: 'Artistic Forge',
  supportEmail: 'support@audioscribe.app',
  privacyEmail: 'privacy@audioscribe.app',
  appStoreUrl: '',
  social: { twitter: '', facebook: '', instagram: '' },
  logoPath: '/assets/logo.png',
  appStoreBadgePath: '/assets/app-store-badge.svg',
} as const;
```

---

## 5. Visual Design Language

### Aesthetic: Warm Editorial Luxury

Not dark tech. Warm, organic, premium — like a high-end creative agency.

### Color System

| Token | Value | Usage |
|-------|-------|-------|
| Hero background | `#BFAB9A` | Hero section fill, warm beige/champagne |
| Body background | `#FFFFFF` | Primary content areas |
| Page background | `#F5F5F8` | Inner pages (docs, support, about, legal) |
| Accent | `#BFAB9A` + variations | Highlighted words, decorative elements, badges |
| Dark cards | `#1A1A1A` / near-black | Contact cards, emphasis blocks |
| Text primary | `#1A1A1A` | Body text on light backgrounds |
| Text on hero | `#FFFFFF` | Text overlaid on hero and dark surfaces |
| Trust column bg | `~#F5F3EF` | Warm-tinted background for Trust & Compliance mega menu column |

### Typography

- **Headings:** Refined serif or transitional typeface — elegant, editorial weight
- **Body:** Clean sans-serif (Inter or similar) — excellent readability
- **Responsive sizing:** `text-4xl` mobile → `text-6xl` desktop for hero headlines

### Border Radius

- Cards: `rounded-3xl` (24px)
- Buttons: `rounded-full` (pill shape)
- Containers: `rounded-2xl`
- Icon wrappers: `rounded-xl`

### Spacing

- Generous whitespace between sections (`py-20` to `py-32`)
- Content never feels cramped
- Tailwind default spacing scale

### Animations (3 categories, all respect `prefers-reduced-motion`)

1. **Scroll-triggered reveals** — elements fade up with `cubic-bezier(0.16, 1, 0.3, 1)` as they enter viewport via Intersection Observer
2. **Hover micro-interactions** — cards lift with shadow intensification, buttons scale subtly
3. **Hero animations** — two signature elements:
   - **3D organic sphere clusters:** Cream/pearl-colored formations cascading down the sides of the hero (video asset or Lottie from template)
   - **Audio waveform:** Delicate white line visualization pulsing gently at hero bottom edge (CSS keyframe animation)

### Dark Cards with Aurora Gradients

Contact/emphasis cards use near-black backgrounds with warm gradient overlay effects (peach, amber, rose blobs) — directly from the Nexsas support page pattern.

### Warm Gradient Blob Accents

Documentation category cards feature soft warm-toned gradient blobs in corners — organic and decorative.

---

## 6. Navigation

### Top-Level Nav

| Position | Item | Type |
|----------|------|------|
| Left | Logo + App Name | Home link |
| Center | Product | Dropdown *(placeholder — TBD)* |
| Center | Resources | **Mega menu** (see below) |
| Center | Company | Dropdown *(placeholder — TBD)* |
| Right | Get it on the App Store | Pill CTA button |

### Resources Mega Menu

Three-column dropdown matching Nexsas layout. Smooth slide-down animation with backdrop blur.

**Column 1 — Help & Documentation** *(white background)*

| Item | Icon | Description |
|------|------|-------------|
| Documentation | doc-add icon | Detailed documentation of the product. |
| Tutorials | chat-bubble icon | Step-by-step guides to help you get started. |
| FAQ | question icon | Frequently asked questions and answers. |
| Support | headset icon | Get help and support from our team. |

**Column 2 — Knowledge & Research** *(white background)*

| Item | Icon | Description |
|------|------|-------------|
| Use Cases | lightbulb icon | Explore real-world scenarios where Audio Scribe delivers results. |
| Analytics | chart icon | Dive into performance metrics and data insights. |
| Changelog | update icon | Stay updated with the latest changes and improvements. |

**Column 3 — Trust & Compliance** *(warm-tinted background ~#F5F3EF)*

| Item | Icon | Description |
|------|------|-------------|
| Security | shield-check icon | How we protect your data. |
| GDPR Compliance | person-lock icon | EU data protection compliance. |
| Privacy Policy | shield icon | How we handle your information. |
| Terms & Conditions | dollar icon | Terms of service. |

### Mobile Navigation

Hamburger opens full-screen drawer. Categories as expandable accordion sections. Touch-friendly tap targets (minimum 44px).

---

## 7. Pages

### 7.1 Home Page

**Hero** — full viewport height. `#BFAB9A` background.
- 3D organic sphere animation framing both sides (template asset)
- Small pill badge: "Now on the App Store"
- Headline: **"Voice captured with precision."**
- Subtitle: on-device AI transcription for Mac, iPad, and iPhone
- Two pill CTAs: "Get it on the App Store" (white filled) | "Learn More" (translucent)
- Audio waveform animation pulsing at bottom edge

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
- App Store badge button

### 7.2 Documentation Landing

Light gray background (`#F5F5F8`).
- "Welcome to Audio Scribe Documentation" headline
- Two category cards at top with warm gradient blob accents: "Getting Started" and "Features"
- Categorized sections below with bullet-point links
- Sub-pages rendered from Markdown/MDX
- Desktop: sidebar navigation with active state
- Mobile: sidebar collapses to dropdown

**Documentation sub-pages:**
- Getting Started
- Features (deep dive)
- FAQ (expandable accordion items)
- Tutorials (grid of YouTube video cards with thumbnails)
- Release Notes (reverse-chronological, version + date + Markdown content)

### 7.3 Support

Light gray background.
- "Reach out to our support team for help." headline
- Left: stacked dark cards with warm aurora gradient accents — Email Us, Documentation link, App Store link
- No contact form (email links are cleaner without backend)
- Below: compact Quick Help FAQ section

### 7.4 About

Light gray background.
- "Crafted by Artistic Forge" headline
- Mission statement section (placeholder copy)
- Three value cards: "Privacy First", "On-Device Intelligence", "Apple Ecosystem Native"
- CTA with App Store button

### 7.5 Legal Pages (Security, GDPR, Privacy Policy, Terms & Conditions)

Clean typographic pages. White content area on light gray background. Each rendered from Markdown — easy to update without code changes. "Last updated" date from frontmatter.

### 7.6 Knowledge Pages (Use Cases, Analytics, Changelog)

- **Use Cases:** showcase cards for meetings, lectures, interviews, audio files, dictation
- **Analytics:** placeholder for usage metrics/insights (content TBD)
- **Changelog:** reverse-chronological release notes from Markdown files

---

## 8. Responsive Design

Mobile-first throughout. Single-column layouts below `768px`.

| Breakpoint | Layout |
|-----------|--------|
| < 640px | Single column, hamburger nav, stacked cards |
| 640–768px | Two-column grids where appropriate |
| 768–1024px | Sidebar nav appears in docs, three-column grids |
| > 1024px | Full desktop layout, mega menu dropdowns |

Touch-friendly tap targets (44px minimum). No hover-dependent interactions on mobile.

---

## 9. i18n Strategy

- English (`/`) as default locale
- Spanish (`/es/`) and French (`/fr/`) as target locales
- Static UI strings in JSON translation files (`src/i18n/en.json`, etc.)
- Content pages duplicated per locale in `src/content/` or use a translation layer
- Astro handles locale-prefixed routing natively

---

## 10. Content Authoring

Documentation, release notes, tutorials, and legal pages are Markdown files with YAML frontmatter:

```md
---
title: "Getting Started"
description: "Set up Audio Scribe on your Apple devices"
lastUpdated: 2026-02-17
---

# Getting Started

Audio Scribe is available on the Apple App Store...
```

Adding content = dropping a `.md` file. No code changes required.

---

## 11. Deployment

GitHub Actions workflow:
1. `npm ci`
2. `astro build` (outputs to `dist/`)
3. Deploy to GitHub Pages

Same GitHub Pages setup at `https://artisticlight.github.io/audio-scribe-site/`.

---

## 12. Template Assets to Extract

From the purchased Nexsas HTML/Tailwind template:
- [ ] Hero 3D sphere animation (video/Lottie/WebGL asset)
- [ ] Audio waveform animation CSS
- [ ] Mega menu HTML structure and transitions
- [ ] Card hover animations and shadow values
- [ ] Warm gradient blob SVGs/CSS for card accents
- [ ] Dark card aurora gradient effects
- [ ] Icon set used in navigation
- [ ] Typography choices (exact font families and weights)
- [ ] Scroll-triggered animation JavaScript
- [ ] Color token values (exact hex codes)
- [ ] Border radius and spacing tokens

---

## 13. Implementation Sequence

1. **Scaffold Astro project** — Tailwind, i18n routing, config.ts, base layout
2. **Port template assets** — extract animations, design tokens, fonts from purchased template
3. **Build navigation** — navbar with mega menu, mobile drawer
4. **Build home page** — hero with animations, trust strip, features, platforms, CTA
5. **Build docs layout** — sidebar, Markdown rendering, sub-pages
6. **Build inner pages** — support, about, legal pages, knowledge pages
7. **Add i18n** — translation files, locale routing
8. **Mobile polish** — responsive testing across breakpoints
9. **Deploy** — GitHub Actions workflow, verify on GitHub Pages
