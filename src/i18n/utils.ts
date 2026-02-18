import en from './en.json';
import es from './es.json';
import fr from './fr.json';

const dictionaries = { en, es, fr } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;

export const locales: Locale[] = ['en', 'es', 'fr'];
export const defaultLocale: Locale = 'en';

/** Labels shown in the language switcher */
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

/**
 * Get the full translation dictionary for the given locale.
 * Falls back to English for unknown locales.
 */
export function getTranslations(locale: string | undefined): Dictionary {
  const key = (locale ?? defaultLocale) as Locale;
  return dictionaries[key] ?? dictionaries.en;
}

/**
 * Build a locale-aware base path.
 *  - English (default): `/audio-scribe-site/`
 *  - Spanish:           `/audio-scribe-site/es/`
 *  - French:            `/audio-scribe-site/fr/`
 */
export function localePath(locale: string | undefined, path = ''): string {
  const base = import.meta.env.BASE_URL; // already has trailing slash
  const prefix = locale && locale !== defaultLocale ? `${locale}/` : '';
  const clean = path.replace(/^\//, '');
  return `${base}${prefix}${clean}`;
}

/**
 * Get the content collection name suffixed by locale.
 * English uses the base name, others use `name_locale`.
 */
export function collectionName(
  base: 'docs' | 'legal' | 'changelog' | 'tutorials',
  locale: string | undefined,
): string {
  const loc = (locale ?? defaultLocale) as Locale;
  return loc === defaultLocale ? base : `${base}_${loc}`;
}
