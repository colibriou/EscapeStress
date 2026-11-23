import { defineConfig } from 'vite';

export default defineConfig({
  base: '/EscapeStress/',
  // Three.js est servi directement afin d’éviter l’optimisation esbuild
  // problématique dans certains dossiers synchronisés OneDrive.
  optimizeDeps: {
    exclude: ['three'],
  },
});
