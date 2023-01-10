import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameEnd } from './game-end'

const user = userEvent.setup({ delay: null })

describe('GameEnd', () => {
  it('Displays the total of chained words', () => {
    render(<GameEnd score={5} onPlayClick={() => {}} />)

    screen.getByRole('heading', { name: /Has encadenado 5 palabras/i })
  })

  it('clicking the "play again" button calls "onPlayClick"', async () => {
    const onPlayClick = jest.fn()
    render(<GameEnd score={5} onPlayClick={onPlayClick} />)

    await user.click(screen.getByRole('button', { name: /jugar/i }))

    expect(onPlayClick).toHaveBeenCalled()
  })
})
