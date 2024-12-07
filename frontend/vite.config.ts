import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { configDefaults } from 'vitest/config';
import type { InlineConfig } from 'vitest';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      exclude: ['node_modules/', 'dist/', '**/*.d.ts', '**/*.test.{ts,tsx}', '**/types/**'],
    },
  } satisfies InlineConfig,
});
