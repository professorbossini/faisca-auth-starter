/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/** Fills <title> with VITE_APP_NAME, falling back to a neutral placeholder. */
function appTitle(mode: string): Plugin {
  const name = loadEnv(mode, process.cwd()).VITE_APP_NAME?.trim() || 'Novo app';
  const escaped = name.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
  return {
    name: 'app-title',
    transformIndexHtml: (html) => html.replace('%APP_TITLE%', escaped),
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), appTitle(mode)],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    headers: {
      // Required so the Google/Firebase sign-in popup can report back to this window.
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
  preview: {
    port: 4173,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
  build: {
    sourcemap: true,
    rolldownOptions: {
      output: {
        // Long-term caching: vendor code changes less often than app code.
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/,
            },
            { name: 'mui', test: /node_modules[\\/](@mui|@emotion|@popperjs)[\\/]/ },
          ],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    env: {
      VITE_AUTH_PROVIDER: 'mock',
      VITE_APP_NAME: '',
      VITE_APP_LOGO_URL: '',
    },
  },
}));
