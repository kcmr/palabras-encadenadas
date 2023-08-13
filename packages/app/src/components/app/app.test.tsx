import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as api from '../../api/words'
import { App } from './app'

const ONE_SECOND = 1000

const user = userEvent.setup({ delay: null })
const getInput = async () => await screen.findByLabelText(/palabra/i)

async function submitWord(word: string) {
  await user.type(await getInput(), `${word}{enter}`)
}

async function typeValue(value: string) {
  await user.type(await getInput(), value)
}

function finishTime() {
  act(() => {
    vi.advanceTimersByTime(ONE_SECOND * 10)
  })
}

describe('App', () => {
  beforeAll(() => {
    // Workaround for <dialog> element not supported yet by JestDOM
    // https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.show = vi.fn()
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(api, 'getWords').mockResolvedValue({
      tata: 'ta',
      tabla: 'bla',
    })
  })

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers()
      vi.useRealTimers()
    })
  })

  it('displays a help message before entering any value in the form', async () => {
    render(<App />)

    await screen.findByText(/escribe una palabra y pulsa intro/i)
  })

  it('starts the countdown after typing in the input the first time', async () => {
    render(<App />)

    await screen.findByText('10')
    await typeValue('a')

    act(() => {
      vi.advanceTimersByTime(ONE_SECOND * 2)
    })

    await screen.findByText('8')
  })

  it('displays "0 palabra(s)" before submitting any word', async () => {
    render(<App />)

    expect(await screen.findByTestId('total-words')).toHaveTextContent('0 palabra(s)')
  })

  it('updates the number of submitted words', async () => {
    render(<App />)

    await submitWord('tata')
    await submitWord('bla')

    expect(screen.getByTestId('total-words')).toHaveTextContent('2 palabra(s)')
  })

  it('submitting a word sets the last word silabe as the first silabe of the next word to enter', async () => {
    const { container } = render(<App />)

    await submitWord('tabla')

    expect(container).toHaveTextContent('bla')
  })

  it('submitting an unknown word displays an error message', async () => {
    const { container } = render(<App />)

    await submitWord('unknown')

    expect(container).toHaveTextContent(/palabra desconocida/i)
  })

  it('submitting a duplicated word displays an error message', async () => {
    const { container } = render(<App />)

    await submitWord('tata')
    await submitWord('ta')

    expect(container).toHaveTextContent(/palabra repe/i)
  })

  it('submitting a valid word clears the form input', async () => {
    render(<App />)

    await submitWord('tabla')

    expect(await getInput()).toHaveDisplayValue('')
  })

  it('submitting an invalid word does not clear the input', async () => {
    render(<App />)

    await submitWord('invalid')

    expect(await getInput()).toHaveDisplayValue('invalid')
  })

  it('prevents typing in the input when the timer ends', async () => {
    render(<App />)

    await typeValue('a')

    finishTime()

    expect(await getInput()).toBeDisabled()
  })

  it('displays the total chained words when the time ends', async () => {
    const { container } = render(<App />)

    await submitWord('tata')
    await submitWord('bla')

    finishTime()

    expect(container).toHaveTextContent(/has encadenado 1 palabras/i)
  })

  it('does not display a negative number of total chained words when the time ends without submitting words', async () => {
    const { container } = render(<App />)

    await typeValue('a{backspace}')

    finishTime()

    expect(container).toHaveTextContent(/has encadenado 0 palabras/i)
  })

  it('clicking the "play again" button restarts the game', async () => {
    render(<App />)

    await submitWord('tata')

    expect(screen.getByTestId('total-words')).toHaveTextContent('1 palabra(s)')

    finishTime()

    await user.click(screen.getByRole('button', { name: /jugar/i }))

    expect(screen.getByTestId('total-words')).toHaveTextContent('0 palabra(s)')
  })

  it('clicking the "info" icon opens a dialog with information', async () => {
    const { container } = render(<App />)

    await user.click(await screen.findByRole('button', { name: /información/i }))

    expect(container).toHaveTextContent(/acerca del juego/i)
  })
})
