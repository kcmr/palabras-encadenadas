import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from './form'

const getInput = () => screen.getByLabelText(/palabra/i)

function submitWord(word: string) {
  fireEvent.change(getInput(), {
    target: {
      value: word,
    },
  })

  fireEvent.submit(screen.getByTestId('form'))
}

describe('Form', () => {
  it('submitting the form calls "onWordSubmit" with the typed word as param', () => {
    const onWordSubmit = jest.fn()
    render(<Form onWordSubmit={onWordSubmit} />)

    submitWord('foo')

    expect(onWordSubmit).toHaveBeenCalledWith('foo')
  })

  it('changing the input value calls "onChange"', () => {
    const onChange = jest.fn()
    render(<Form onChange={onChange} />)

    submitWord('foo')

    expect(onChange).toHaveBeenCalled()
  })

  it('setting "disabled" to "true" sets the input as disabled', () => {
    const { rerender } = render(<Form />)

    expect(getInput()).toBeEnabled()

    rerender(<Form disabled={true} />)

    expect(getInput()).toBeDisabled()
  })
})
