import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [
      svelte({
        disableDependencyReinclusion: ['@roxi/routify']
      })
    ],
    build: {
      minify: isProduction
    }
  }
})
