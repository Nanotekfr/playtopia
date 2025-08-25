import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [preact()],

  adapter: node({
    mode: 'standalone', // <--- obligatoire, sinon erreur "Setting the 'mode' option is required"
  }),

  vite: {
    envPrefix: 'API_',
    optimizeDeps: {
      include: ['preact', 'preact/hooks'],
    },
  },
});