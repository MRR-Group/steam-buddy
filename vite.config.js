import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import i18n from 'laravel-react-i18n/vite';

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      hmr: {
        host: 'localhost',
      },
      port: env.NODE_PORT,
    },
    plugins: [
      laravel({
        input: 'resources/js/app.tsx',
        refresh: true,
      }),
      react(),
      i18n(),
    ],
  };
});
