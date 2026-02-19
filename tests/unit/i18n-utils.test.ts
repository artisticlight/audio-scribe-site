import { describe, expect, it } from 'vitest';
import {
  collectionName,
  defaultLocale,
  getTranslations,
  localeLabels,
  localePath,
} from '../../src/i18n/utils';

describe('i18n utils', () => {
  it('falls back to English translations for unknown locales', () => {
    const fallback = getTranslations('unknown-locale');
    const english = getTranslations('en');

    expect(fallback.nav.home).toBe(english.nav.home);
    expect(fallback.nav.home).toBe('Home');
  });

  it('builds locale-aware paths using configured base URL', () => {
    const base = '/audio-scribe-site/';
    expect(localePath(defaultLocale, '', base)).toBe('/audio-scribe-site/');
    expect(localePath('en', 'docs/getting-started/', base)).toBe(
      '/audio-scribe-site/docs/getting-started/',
    );
    expect(localePath('es', '/docs/', base)).toBe('/audio-scribe-site/es/docs/');
    expect(localePath('fr', 'support/', base)).toBe('/audio-scribe-site/fr/support/');
  });

  it('resolves locale-specific collection names', () => {
    expect(collectionName('docs', 'en')).toBe('docs');
    expect(collectionName('legal', 'es')).toBe('legal_es');
    expect(collectionName('tutorials', 'fr')).toBe('tutorials_fr');
  });

  it('exposes human-readable labels for each locale', () => {
    expect(localeLabels).toEqual({
      en: 'English',
      es: 'Español',
      fr: 'Français',
    });
  });
});
