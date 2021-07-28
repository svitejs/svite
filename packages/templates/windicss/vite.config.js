import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import vitePluginWindicss from 'vite-plugin-windicss'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [
      // uses enforce: pre
      svelte({}),
      vitePluginWindicss.default({
        transformCSS: 'pre'
      })
    ],
    build: {
      minify: isProduction
    }
  }
})
