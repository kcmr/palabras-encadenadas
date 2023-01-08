import { act, fireEvent, render, screen } from '@testing-library/react'
import * as api from '../../api/words'
import { App } from './app'

const ONE_SECOND = 1000

const getInput = async () => await screen.findByLabelText(/palabra/i)
const getForm = async () => await screen.findByTestId('form')

async function submitWord(word: string) {
  fireEvent.change(await getInput(), {
    target: {
      value: word,
    },
  })

  fireEvent.submit(await getForm())
}

async function typeValue(value: string) {
  fireEvent.input(await getInput(), {
    target: {
      value,
    },
  })
}

function finishTime() {
  act(() => {
    jest.advanceTimersByTime(ONE_SECOND * 10)
  })
}

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(api, 'getWords').mockResolvedValue({
      tata: 'ta',
      tabla: 'bla',
    })
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
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
      jest.advanceTimersByTime(ONE_SECOND * 2)
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

  it('clicking the "play again" button restarts the game', async () => {
    render(<App />)

    await submitWord('tata')

    expect(screen.getByTestId('total-words')).toHaveTextContent('1 palabra(s)')

    finishTime()

    fireEvent.click(screen.getByRole('button', { name: /jugar/i }))

    expect(screen.getByTestId('total-words')).toHaveTextContent('0 palabra(s)')
  })
})
