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

function typeValue(value: string) {
  fireEvent.input(getInput(), {
    target: {
      value,
    },
  })
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

  it('calls "onFirstInput" the first time the input is edited', () => {
    const onFirstInput = jest.fn()
    render(<Form onFirstInput={onFirstInput} />)

    typeValue('a')
    typeValue('b')

    expect(onFirstInput).toHaveBeenCalledTimes(1)
  })
})
