import type { Plugin } from 'vite'
import type { Options } from 'vite-plugin-markdoc'
import { transformMarkdown } from 'vite-plugin-markdoc'

const mdExtRE = /\.(md)$/i

export default function plugin(options?: Options): Plugin {
  return {
    name: 'vite-plugin-markdoc-vue',
    enforce: 'pre',
    transform(code, id) {
      if (!mdExtRE.test(id))
        return null

      const content = transformMarkdown(code, options)
      const contentStr = JSON.stringify(content)

      const sfc = `
        <script setup>
        import VueRenderer from 'vue-markdoc'
    
        const props = defineProps(['components'])
        const Transformed = VueRenderer(${contentStr}, { components: props.components })
        </script>
    
        <template>
          <Transformed />
        </template>
      `

      return sfc
    },
  }
}
