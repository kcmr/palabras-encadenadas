import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: { postcss: { plugins: [] } },
  test: {
    include: ['./src/**/*.test.{ts,tsx}'],
    setupFiles: ['vitest.setup.ts'],
    environment: 'jsdom',
    globals: true,
  },
})
