import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()],
  vite: {
    envPrefix: 'API_',
    optimizeDeps: {
      include: ['preact', 'preact/hooks'],
    },
    middleware: [
      {
        path: '/admin',
        handler: './src/middleware/admin-only.ts',
      },
    ],
  }
});