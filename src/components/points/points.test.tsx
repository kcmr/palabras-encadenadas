import { render, screen } from '@testing-library/react'
import { Points } from './points'

describe('Points', () => {
  it('renders something', () => {
    render(<Points total={5} />)

    expect(screen.getByText('5')).toBeInTheDocument()
  })
})
