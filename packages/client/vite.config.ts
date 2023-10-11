import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/dev': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '#': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/server/api', import.meta.url)),
    },
  },
});
