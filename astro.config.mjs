// https://astro.build/config
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()],
  vite: {
    envPrefix: 'API_',
    optimizeDeps: {
      include: ['preact', 'preact/hooks'],
    },
  },
});
