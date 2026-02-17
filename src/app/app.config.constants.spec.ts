import { describe, expect, it } from 'vitest';
import { APP_CONFIG } from './app.config.constants';

describe('APP_CONFIG', () => {
  it('uses a launch-updates fallback when App Store URL is not set', () => {
    expect(APP_CONFIG.appStoreUrl).toBe('');
    expect(APP_CONFIG.launchUpdatesUrl.startsWith('mailto:')).toBe(true);
  });
});
