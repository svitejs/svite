import sveltePreprocess from 'svelte-preprocess'
const { typescript } = sveltePreprocess
export default {
  preprocess: [typescript()]
}
