import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mdsvex } from 'mdsvex'
import { typescript } from 'svelte-preprocess'

export default {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    mdsvex({
      layout: join(
        dirname(fileURLToPath(import.meta.url)),
        'src',
        'layouts',
        'MdsvexLayout.svelte'
      )
    }),
    typescript()
  ]
}
