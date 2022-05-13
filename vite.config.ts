import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import MarkdocVue from './src/index'

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    MarkdocVue({
      tags: {
        callout: {
          render: 'Callout',
          attributes: {},
        },
      },
    }),
  ],
})
