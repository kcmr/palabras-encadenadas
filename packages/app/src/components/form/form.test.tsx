import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './form'

const user = userEvent.setup({ delay: null })
const getInput = () => screen.getByLabelText(/palabra/i)

async function submitWord(word: string) {
  await user.type(await getInput(), `${word}{enter}`)
}

describe('Form', () => {
  it('submitting the form calls "onWordSubmit" with the typed word as param', async () => {
    const onWordSubmit = jest.fn()
    render(<Form onWordSubmit={onWordSubmit} />)

    await submitWord('foo')

    expect(onWordSubmit).toHaveBeenCalledWith('foo')
  })

  it('changing the input value calls "onChange"', async () => {
    const onChange = jest.fn()
    render(<Form onChange={onChange} />)

    await submitWord('foo')

    expect(onChange).toHaveBeenCalled()
  })

  it('setting "disabled" to "true" sets the input as disabled', () => {
    const { rerender } = render(<Form />)

    expect(getInput()).toBeEnabled()

    rerender(<Form disabled={true} />)

    expect(getInput()).toBeDisabled()
  })
})
