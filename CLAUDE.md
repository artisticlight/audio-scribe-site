# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Marketing and documentation website for **Audio Scribe**, an iOS/macOS voice transcription app. Built with Angular 21 and Angular Material.

## Commands

- `npm start` — dev server at localhost:4200 (hot reload)
- `npm run build` — production build to `dist/`
- `npm run watch` — dev build with watch mode
- `ng generate component pages/my-page` — scaffold new component (schematics default to SCSS, skipTests)

No test runner is configured (all schematics have `skipTests: true`, no test dependencies installed).

## Architecture

**Standalone components only** — no NgModules. Each component declares its own imports.

**Root component** is `App` (not `AppComponent`) in `src/app/app.ts`. Uses Angular signals for state (`isDarkMode`, `isSidenavOpen`).

**Routing** — all routes use lazy loading via `loadComponent()` in `src/app/app.routes.ts`. The `/documentation` route has child routes (getting-started, features, faq).

**Centralized branding config** — `src/app/app.config.constants.ts` (`APP_CONFIG`) holds app name, emails, URLs, and asset paths. Components import this constant directly rather than using a service.

**i18n** — `@angular/localize` is initialized in `main.ts`. Templates use the `i18n` attribute on translatable elements. Translation files are in `src/locale/` (source: en, targets: es, fr). Extract with `ng extract-i18n`.

## Styling

- **SCSS** everywhere (global + component-level)
- **Angular Material** with `mat.theme()` using azure/blue palettes
- **Dark mode** via CSS custom properties on `:root` / `html.dark` in `src/styles.scss` — toggled by adding/removing the `dark` class on `<html>`
- CSS variables follow the pattern `--sys-*` (surface, on-surface, primary, etc.)
- Responsive breakpoints: 599px (mobile), 600px (desktop), 768px (wider layouts)
- Utility classes: `.container`, `.section`, `.hide-mobile`, `.hide-desktop`

## Conventions

- Prettier config is in `package.json`: 100 char width, single quotes, Angular HTML parser
- Component selector prefix: `app-`
- Page components live under `src/app/pages/<name>/`
- Small components use inline templates/styles; larger ones use separate `.html`/`.scss` files
