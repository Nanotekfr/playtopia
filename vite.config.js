import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    hmr: {
      overlay: false, // désactive l'overlay d'erreur HMR
    },
  },
});
