import { typescript } from 'svelte-preprocess'

export default {
  extensions: ['.svelte'],
  preprocess: [typescript()]
}
