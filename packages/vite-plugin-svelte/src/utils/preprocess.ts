import { Plugin, ResolvedConfig, TransformResult } from 'vite'
import { PreprocessorGroup, ResolvedOptions } from './options'
import { TransformPluginContext } from 'rollup'
// import type { WindiPluginUtils } from '@windicss/plugin-utils'
const supportedLangs = [
  'css',
  'less',
  'sass',
  'scss',
  'styl',
  'stylus',
  'postcss'
]

export function createViteStylePreprocessor(
  cssPlugin: Plugin,
  options: ResolvedOptions
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
      const stylePreprocessModuleId = `${filename}.${lang}`
      const moduleGraph = options.server?.moduleGraph
      if (moduleGraph && !moduleGraph.getModuleById(stylePreprocessModuleId)) {
        await moduleGraph.ensureEntryFromUrl(stylePreprocessModuleId)
      }
      const transformResult: TransformResult = (await cssTransform(
        content,
        stylePreprocessModuleId
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

/*
function createWindicssStylePreprocessorFromVite(
  windiPlugin: Plugin
): PreprocessorGroup {
  const cssTransform = windiPlugin.transform!.bind(
    (null as unknown) as TransformPluginContext
  )
  return {
    style: async ({attributes,content, filename }) => {
      const lang = attributes.lang as string || 'css'
      const transformResult: string = (await cssTransform(
        content,
        `${filename}.${lang}`
      )) as unknown as string


      return {
        code: transformResult
      }
    }
  } as PreprocessorGroup
}



function createWindicssApiStylePreprocessorFromVite(
  windiPlugin: Plugin
): PreprocessorGroup {
  const windiAPI = windiPlugin.api as WindiPluginUtils

  return {
    style: async ({  content, filename }) => {
      windiAPI.extractFile(content,filename,false);
      const transformResult = await windiAPI.transformGroupsWithSourcemap(content)
      if(transformResult) {
        return {
          code: transformResult.code,
          map: transformResult.map as object
        }
      }
    }
  } as PreprocessorGroup
}

 */

export function buildExtraPreprocessors(
  options: ResolvedOptions,
  config: ResolvedConfig
) {
  const extraPreprocessors = []
  if (options.useVitePreprocess) {
    const viteCssPlugin = config.plugins.find((p) => p.name === 'vite:css')
    extraPreprocessors.push(
      createViteStylePreprocessor(viteCssPlugin!, options)
    )
  }
  // TODO
  /*
  const windiCssPlugin = config.plugins.find(p => p.name === 'vite-plugin-windicss:css');
  if (windiCssPlugin) {
    extraPreprocessors.unshift(createWindicssStylePreprocessorFromVite(windiCssPlugin))
  }
   */
  return extraPreprocessors
}
