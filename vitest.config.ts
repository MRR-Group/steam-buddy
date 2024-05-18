import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

// eslint-disable-next-line import/no-default-export
export default defineConfig(() => {
  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      css: true,
      setupFiles: './resources/js/test-setup.ts',
      include: './resources/js/**/*.test.?(c|m)[jt]s?(x)',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './resources/js'),
      },
    },
  };
});
