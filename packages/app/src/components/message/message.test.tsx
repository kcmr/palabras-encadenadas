import { render, screen } from '@testing-library/react'
import { Message } from './message'

describe('Message', () => {
  it('Displays "info" icon by default', () => {
    render(<Message>foo</Message>)

    expect(screen.getByTestId('info')).toBeInTheDocument()
  })

  it('Displays the specified text', () => {
    render(<Message>any</Message>)

    expect(screen.getByText('any')).toBeInTheDocument()
  })

  it('Setting type "error" displays an error icon', () => {
    render(<Message type="error">any</Message>)

    expect(screen.getByRole('img', { name: 'Error' })).toBeInTheDocument()
  })
})
