import { expect, test } from '@playwright/test';

test('localized home pages render with correct document language', async ({ page }) => {
  const routes = [
    { path: '', lang: 'en' },
    { path: 'es/', lang: 'es' },
    { path: 'fr/', lang: 'fr' },
  ];

  for (const route of routes) {
    await page.goto(route.path);
    await expect(page.locator('html')).toHaveAttribute('lang', route.lang);
    await expect(page).toHaveTitle(/Audio Scribe/);
  }
});

test('core documentation and support routes are reachable', async ({ request }) => {
  const paths = [
    'docs/getting-started/',
    'docs/tutorials/',
    'docs/changelog/',
    'support/',
    'legal/privacy/',
    'es/docs/getting-started/',
    'es/docs/tutorials/',
    'es/docs/changelog/',
    'es/support/',
    'es/legal/privacy/',
    'fr/docs/getting-started/',
    'fr/docs/tutorials/',
    'fr/docs/changelog/',
    'fr/support/',
    'fr/legal/privacy/',
  ];

  for (const path of paths) {
    const response = await request.get(path);
    expect(response.ok(), `${path} should return HTTP 2xx`).toBeTruthy();
  }
});

test('docs index pages redirect to the first doc per locale', async ({ page }) => {
  await page.goto('docs/');
  await page.waitForURL('**/audio-scribe-site/docs/getting-started/');

  await page.goto('es/docs/');
  await page.waitForURL('**/audio-scribe-site/es/docs/getting-started/');

  await page.goto('fr/docs/');
  await page.waitForURL('**/audio-scribe-site/fr/docs/getting-started/');
});
