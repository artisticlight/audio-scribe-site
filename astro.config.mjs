// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://artisticlight.github.io',
  base: '/audio-scribe-site/',
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
