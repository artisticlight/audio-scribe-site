# Review Fixes Design

Fixes all 26 issues from the code review at `reviews/review-20260216-2124.md`. Changes grouped by file to minimize context switching.

## Decisions

- **Dark mode:** Initialize from OS `prefers-color-scheme`, persist toggle to `localStorage`.
- **Icons:** Keep CDN font, switch to Material Symbols Outlined with `preload` + `display=swap`.
- **i18n:** Apply `$localize` tagged templates to all dynamic user-facing strings now.

---

## Section 1: Configuration & Build

| File | Change |
|------|--------|
| `package.json` | Remove `@angular/material` from `devDependencies` |
| `.gitignore` | Add `.env*` pattern |
| `angular.json` | Add explicit `optimization` with `inlineCritical: true` to production config; add `standalone: true` to component schematic |
| `src/app/app.config.ts` | Remove `provideClientHydration()` and its import |
| `src/app/app.routes.ts` | Add parent-level redirect `documentation` -> `documentation/getting-started` with `pathMatch: 'full'`; remove empty-path child redirect |

## Section 2: index.html — Fonts & Icons

| File | Change |
|------|--------|
| `src/index.html` | Replace blocking Material Icons link with preloaded `Material+Symbols+Outlined&display=swap` and noscript fallback |
| `src/index.html` | Trim Google Fonts to `Inter:wght@400;500;600` only, remove Roboto |

Note: Verify icon name compatibility when switching from Material Icons to Material Symbols Outlined.

## Section 3: Root Component

**`src/app/app.ts`:**

- Remove `CommonModule` import
- Replace `RouterModule` with `RouterLink`, `RouterLinkActive`, `RouterOutlet`
- Add `ChangeDetectionStrategy.OnPush`
- Dark mode: read `localStorage` -> fall back to `prefers-color-scheme` -> apply `dark` class in constructor -> persist on toggle
- Wrap `navigationItems` labels with `$localize`

**`src/app/app.html`:**

- Replace `(closed)` with `(openedChange)="isSidenavOpen.set($event)"` on sidenav
- Add `aria-label` to: `<mat-sidenav>` ("Mobile navigation"), toolbar `<nav>` ("Main navigation"), footer `<nav>` ("Footer navigation")
- Add `i18n` to static text: "Quick Links", "Download", footer description, nav link labels, copyright
- Add `width="32" height="32"` to toolbar logo `<img>`

## Section 4: Home Page

**`src/app/pages/home/home.component.ts`:**

- Remove `CommonModule`, replace `RouterModule` with `RouterLink`
- Add `ChangeDetectionStrategy.OnPush`
- Wrap `features` array `title` and `description` strings with `$localize`

**`src/app/pages/home/home.component.html`:**

- Add `width="120" height="120" loading="eager" fetchpriority="high"` to hero logo

**`src/app/pages/home/home.component.scss`:**

- Add `@media (prefers-reduced-motion: reduce) { animation: none; }` to `.wave-bar`
- Replace inline `[style.animation-delay]` bindings with SCSS `@for` loop for `.wave-bar:nth-child(n)` rules

## Section 5: Documentation Pages

**`src/app/pages/documentation/documentation.component.ts`:**

- Remove `CommonModule`, replace `RouterModule` with `RouterLink`, `RouterLinkActive`, `RouterOutlet`
- Remove unused `MatSidenavModule`
- Add `ChangeDetectionStrategy.OnPush`

**`src/app/pages/documentation/documentation.component.html`:**

- Add `aria-label="Documentation navigation"` to `<aside>`

**`src/app/pages/documentation/getting-started/getting-started.component.ts`:**

- Remove `CommonModule` and unused `MatCardModule`
- Import `APP_CONFIG`, replace hardcoded "Audio Scribe" with `{{ config.name }}`

**`src/app/pages/documentation/features/features.component.ts`:**

- Remove `CommonModule`
- Import `APP_CONFIG`, replace hardcoded "Audio Scribe" with `{{ config.name }}`

**`src/app/pages/documentation/faq/faq.component.ts`:**

- Remove `CommonModule`

## Section 6: Support, Privacy, About Pages

**`src/app/pages/support/support.component.ts`:**

- Add `RouterLink` to imports (build-breaking fix)
- Remove `CommonModule`, `MatInputModule`, `MatFormFieldModule`
- Wrap `supportOptions` and `faqs` strings with `$localize`

**`src/app/pages/privacy/privacy.component.ts`:**

- Remove `CommonModule`
- Import `APP_CONFIG`, add `protected readonly config = APP_CONFIG`
- Replace hardcoded email with `config.privacyEmail`
- Replace hardcoded "Audio Scribe" with `{{ config.name }}`

**`src/app/pages/about/about.component.ts`:**

- Remove `CommonModule`
