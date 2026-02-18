/**
 * Centralized site configuration.
 * Change the app name here — it updates everywhere.
 */
const _SITE = {
  appName: 'Audio Scribe',
  companyName: 'Artistic Forge',
  supportEmail: 'support@audioscribe.app',
  privacyEmail: 'privacy@audioscribe.app',
  bugsEmail: 'bugs@audioscribe.app',
  featuresEmail: 'features@audioscribe.app',
  appStoreUrl: '',
  launchUpdatesUrl:
    'mailto:support@audioscribe.app?subject=Notify%20me%20when%20Audio%20Scribe%20launches',
  social: {
    twitter: '',
    facebook: '',
    instagram: '',
  },
  logoPath: '/assets/logo.png',
  appStoreBadgePath: '/assets/app-store-badge.svg',
} as const;

export const SITE = Object.freeze(_SITE);

/** Whether the App Store listing is live */
export const hasAppStoreUrl = SITE.appStoreUrl.trim().length > 0;

/** The primary CTA URL — App Store if available, otherwise waitlist */
export const ctaUrl = hasAppStoreUrl ? SITE.appStoreUrl : SITE.launchUpdatesUrl;

/** The primary CTA label */
export const ctaLabel = hasAppStoreUrl ? 'Get it on the App Store' : 'Get Launch Updates';
