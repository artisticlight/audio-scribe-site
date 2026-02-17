/**
 * Application Configuration
 *
 * Centralized configuration for easy customization.
 * Change these values to update the app branding.
 */
const _APP_CONFIG = {
  // Application name - change this when the official name is decided
  name: 'Audio Scribe',

  // Short name for mobile displays
  shortName: 'AudioScribe',

  // App Store link (set once the app ID is available)
  appStoreUrl: '',

  // Fallback while App Store URL is pending
  launchUpdatesUrl: 'mailto:support@audioscribe.app?subject=Notify%20me%20when%20Audio%20Scribe%20launches',

  // Support email
  supportEmail: 'support@audioscribe.app',

  // Privacy email
  privacyEmail: 'privacy@audioscribe.app',

  // Bug report email
  bugsEmail: 'bugs@audioscribe.app',

  // Feature request email
  featuresEmail: 'features@audioscribe.app',

  // Logo paths
  logoPath: 'assets/logo.png',
  appStoreBadgePath: 'assets/app-store-badge.svg',

  // Social links (add as needed)
  social: {
    twitter: '',
    facebook: '',
    instagram: ''
  }
} as const;

export const APP_CONFIG = Object.freeze(_APP_CONFIG);
