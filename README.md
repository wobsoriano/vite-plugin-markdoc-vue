# vite-plugin-markdoc

A plugin that enables you to import [Markdoc](https://markdoc.io/) extended markdowns as Vue components.

## Installation

Install

```bash
pnpm add vite-plugin-markdoc-vue -D
```

### TypeScript Shum

where needed:

```ts
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}
```

then add the following to `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import MarkdocVue from 'vite-plugin-markdoc'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    MarkdocVue(),
  ]
})
```

And import it as a normal Vue component.

## Import Markdown as Vue components

```html
<script setup>
import Content from './content.md'
</script>

<template>
  <Content />
</template>
```

## Configuration

The plugin accepts an optional [`Markdoc.transform`](https://markdoc.io/docs/syntax#config) config:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    MarkdocVue({
      nodes: {},
      tags: {}
    }),
  ]
})
```

## License

MIT
