import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { defineComponent, h } from 'vue'
import Content from './content.md'

test('Transform markdown to Vue component', () => {
  const App = defineComponent({
    setup() {
      return () => h(Content)
    },
  })

  const wrapper = mount(App)
  expect(wrapper.html()).toMatchSnapshot()
})
