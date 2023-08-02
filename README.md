# vite-plugin-markdoc-vue

A plugin that enables you to import [Markdoc](https://markdoc.io/) extended markdowns as Vue components.

## Installation

Install the [renderer](https://github.com/wobsoriano/vue-markdoc) and plugin:

```bash
pnpm add @markdoc/markdoc vite-plugin-markdoc-vue -D
```

### TypeScript Shim

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
import MarkdocVue from 'vite-plugin-markdoc-vue'

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

## Render Vue components

Imported markdown files accepts an optional `components` object as a `prop`. The `components` object specifies a mapping from your tags and nodes to the corresponding Vue component.

First, add your transformation options to the plugin:

```ts
const tags = {
  callout: {
    render: 'Callout',
    attributes: {}
  }
}

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    MarkdocVue({
      tags
    }),
  ]
})
```

Then pass your custom component:

```md
{% callout %}
Attention, over here!
{% /callout %}
```

```html
<script setup>
import Content from './content.md'
import Callout from './Callout.vue'
</script>

<template>
  <Content :components="{ Callout }" />
</template>
```

```html
<template>
  <div class="callout">
    <slot />
  </div>
</template>

<style>
.callout {}
</style>
```

This renders to:

```html
<article>
  <div class="callout">
    <p>Attention, over here!</p>
  </div>
</article>
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

## Related

- [vue-markdoc](https://github.com/wobsoriano/vue-markdoc) - Vue renderer for Markdoc
- [vite-plugin-markdoc](https://github.com/wobsoriano/vite-plugin-markdoc) - Markdoc plugin for Vite

## License

MIT
