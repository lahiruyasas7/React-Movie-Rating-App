/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Allows using `describe`, `it`, `expect` without import
    environment: 'jsdom', // Simulates browser environment
    setupFiles: './src/setupTests.ts', // Your test setup
  },
})
