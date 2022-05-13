import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent, h } from 'vue'
import Content from './content.md'

test('Transform markdown to Vue component', () => {
  const Callout = defineComponent({
    setup(_props, { slots }) {
      return () => h('div', { class: 'callout' }, slots)
    }
  })

  const App = defineComponent({
    setup() {
      return () => h(Content, {
        components: { Callout }
      })
    },
  })

  const wrapper = mount(App)
  expect(wrapper.html()).toMatchSnapshot()
})
