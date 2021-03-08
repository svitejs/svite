import { Plugin, TransformResult } from 'vite'
import { PreprocessorGroup } from './options'
import { TransformPluginContext } from 'rollup'

const supportedLangs = [
  'css',
  'less',
  'sass',
  'scss',
  'styl',
  'stylus',
  'postcss'
]

export function createSvelteStylePreprocessorFromVite(
  cssPlugin: Plugin
): PreprocessorGroup {
  const cssTransform = cssPlugin.transform!.bind(
    (null as unknown) as TransformPluginContext
  )
  return {
    style: async ({ attributes, content, filename }) => {
      const lang = attributes.lang as string
      if (!supportedLangs.includes(lang)) {
        return { code: content }
      }
      const transformResult: TransformResult = (await cssTransform(
        content,
        `${filename}.${lang}`
      )) as TransformResult
      // TODO vite:css transform currently returns an empty mapping that would kill svelte compiler.
      const hasMap = !!transformResult.map?.mappings
      return {
        code: transformResult.code,
        map: hasMap ? (transformResult.map as object) : null,
        dependencies: transformResult.deps
      }
    }
  } as PreprocessorGroup
}
