/**
 * Application Configuration
 *
 * Centralized configuration for easy customization.
 * Change these values to update the app branding.
 */
export const APP_CONFIG = {
  // Application name - change this when the official name is decided
  name: 'Audio Scribe',

  // Short name for mobile displays
  shortName: 'AudioScribe',

  // App Store link (update with actual app ID when available)
  appStoreUrl: 'https://apps.apple.com/app/audio-scribe',

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
