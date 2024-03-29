import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

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
        input: 'resources/js/app.jsx',
        refresh: true,
      }),
      react(),
    ],
  };
});
