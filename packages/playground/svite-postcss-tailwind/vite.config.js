import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import { postcss } from 'svelte-preprocess'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [svelte()],
    build: {
      minify: isProduction
    }
  }
})
