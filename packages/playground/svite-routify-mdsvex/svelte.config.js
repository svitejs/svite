const { join, dirname } = require('path')
const { fileURLToPath } = require('url')
const { mdsvex } = require('mdsvex')

module.exports = {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    mdsvex({
      layout: join(
        dirname(fileURLToPath(import.meta.url)),
        'src',
        'layouts',
        'MdsvexLayout.svelte'
      )
    })
  ]
}
