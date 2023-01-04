import { render } from '@testing-library/react'
import { Points } from './points'

describe('Points', () => {
  it('displays the expected text', () => {
    const { container } = render(<Points total={5} />)

    expect(container).toHaveTextContent('5 palabra(s)')
  })
})
