import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    optimizeDeps: {
      exclude: ['@svitejs/hmr-test-dependency']
    },
    plugins: [svelte()],
    build: {
      minify: isProduction
    }
  }
})
