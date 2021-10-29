import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [
      svelte(),
      WindiCSS()
    ],
    build: {
      minify: isProduction
    }
  }
})
