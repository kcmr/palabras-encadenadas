import renderer from 'react-test-renderer'
import * as icons from '.'
import type { ElementType } from 'react'

describe('Icons', () => {
  Object.keys(icons).forEach((name) => {
    it(`<${name}> renders the expected svg`, () => {
      const Icon = icons[name as keyof typeof icons] as ElementType
      const output = renderer.create(<Icon />).toJSON()
      expect(output).toMatchSnapshot()
    })
  })
})
