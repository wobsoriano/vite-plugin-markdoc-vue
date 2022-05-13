import type { Plugin } from 'vite'
import Markdoc from '@markdoc/markdoc'

export type Options = Parameters<typeof Markdoc.transform>['1']

const mdExtRE = /\.(md)$/i

export default function plugin(options?: Options): Plugin {
  return {
    name: 'vite-plugin-markdoc-vue',
    enforce: 'pre',
    transform(code, id) {
      if (!mdExtRE.test(id))
        return null

      const ast = Markdoc.parse(code)
      const content = Markdoc.transform(ast, options)
      const contentStr = JSON.stringify(content)

      const sfc = `
        <script setup>
        import VueRenderer from 'vue-markdoc'
    
        const props = defineProps(['components'])
        const SFC = VueRenderer(${contentStr}, { components: props.components })
        </script>
    
        <template>
          <SFC />
        </template>
      `

      return sfc
    },
  }
}
