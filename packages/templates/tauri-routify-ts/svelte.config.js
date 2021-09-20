import sveltePreprocess from 'svelte-preprocess'
const { typescript } = sveltePreprocess

export default {
  extensions: ['.svelte'],
  preprocess: [typescript()]
}
