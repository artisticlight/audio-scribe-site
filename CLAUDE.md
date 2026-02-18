# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Marketing and documentation website for **Audio Scribe**, an iOS/macOS voice transcription app. Built with Angular 21 and Angular Material. Deployed to GitHub Pages via GitHub Actions.

## Commands

- `npm start` — dev server at localhost:4200 (hot reload)
- `npm run build` — production build to `dist/audio-scribe-site/browser/`
- `npm run watch` — dev build with watch mode
- `npm run lint` — ESLint with angular-eslint (flat config in `eslint.config.js`)
- `npm test` — unit tests via Vitest (`@angular/build:unit-test` builder, `tsconfig.spec.json`)
- `ng generate component pages/my-page` — scaffold new component (schematics default to standalone, SCSS, skipTests)
- `ng extract-i18n` — extract translation source file

## Architecture

**Standalone components only** — no NgModules. Each component declares its own imports. Import individual router directives (`RouterLink`, `RouterLinkActive`, `RouterOutlet`) rather than `RouterModule`. Do not import `CommonModule` — the codebase uses Angular 17+ control flow syntax (`@for`, `@if`) exclusively.

**Root component** is `App` (not `AppComponent`) in `src/app/app.ts`. Uses `ChangeDetectionStrategy.OnPush` and Angular signals for state (`isDarkMode`, `isSidenavOpen`). Prefer `OnPush` for all components.

**Routing** — all routes use lazy loading via `loadComponent()` in `src/app/app.routes.ts`. The `/documentation` route has a parent-level redirect to `/documentation/getting-started` (separate route entry with `pathMatch: 'full'`), plus a layout component with child routes.

**Centralized branding config** — `src/app/app.config.constants.ts` (`APP_CONFIG`) holds app name, emails, URLs, and asset paths as a frozen `as const` object. All components must reference `APP_CONFIG` for branding — never hardcode the app name or emails.

**i18n** — `@angular/localize` is initialized in `main.ts`. Templates use the `i18n` attribute on translatable elements. Dynamic strings in TypeScript (arrays of labels, titles, descriptions) use `$localize` tagged template literals. Translation files are in `src/locale/` (source: en, targets: es, fr). Extract with `ng extract-i18n`.

**Dark mode** — initialized from `localStorage` (key: `audio-scribe:darkMode`), falling back to OS `prefers-color-scheme`. Toggling persists to `localStorage`. The `dark` class is applied to `document.documentElement`.

## CI / Deployment

**CI** (`.github/workflows/ci.yml`) — runs on pull requests to `main`: lint, test, production build with localization.

**Deploy** (`.github/workflows/deploy.yml`) — runs on push to `main`: lint, test, build, then deploys to GitHub Pages at `https://artisticlight.github.io/audio-scribe-site/`. The `baseHref` in `angular.json` is `/audio-scribe-site/`. A `public/404.html` handles SPA routing for deep links.

## Styling

- **SCSS** everywhere (global + component-level inline)
- **Angular Material** with `mat.theme()` using azure/blue palettes
- Dark mode via CSS custom properties on `:root` / `html.dark` in `src/styles.scss`
- CSS variables follow the pattern `--sys-*` (surface, on-surface, primary, etc.)
- Component style budget: 5kB warning / 9kB error (`angular.json` > budgets > `anyComponentStyle`)
- Responsive breakpoints: 599px (mobile), 768px (tablet), 992px (desktop), 1200px (wide)
- Utility classes: `.container`, `.section`, `.hide-mobile`, `.hide-desktop`
- Respect `prefers-reduced-motion` for animations

## Conventions

- Prettier config is in `package.json`: 100 char width, single quotes, Angular HTML parser
- TypeScript strict mode with `strict: true`, `noImplicitReturns`, `noFallthroughCasesInSwitch`
- Component selector prefix: `app-`
- Page components live under `src/app/pages/<name>/`
- Small components use inline templates/styles; larger ones use separate `.html`/`.scss` files
- All `<nav>` landmarks must have unique `aria-label` attributes
- External `target="_blank"` links should include `rel="noopener noreferrer"` and a `title` attribute
- Images should include `width`/`height` attributes to prevent CLS; use `loading="lazy"` for below-fold images
