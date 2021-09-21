import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
// eslint-disable-next-line node/no-missing-import
import routify from '@roxi/routify/vite-plugin'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [
      routify(),
      svelte({
        disableDependencyReinclusion: ['@roxi/routify']
      })
    ],
    build: {
      minify: isProduction
    }
  }
})
