import { getViteConfig } from 'astro/config';
import { defineConfig } from 'vitest/config';

const astroViteConfig = getViteConfig({}) as any;

export default defineConfig(async (env) => {
  const resolved =
    typeof astroViteConfig === 'function' ? await astroViteConfig(env) : astroViteConfig;

  return {
    ...(resolved as Record<string, unknown>),
    test: {
      include: ['tests/unit/**/*.test.ts'],
      environment: 'node',
      reporters: ['default'],
    },
  };
});
