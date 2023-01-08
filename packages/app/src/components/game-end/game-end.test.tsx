import { fireEvent, render, screen } from '@testing-library/react'
import { GameEnd } from './game-end'

describe('GameEnd', () => {
  it('Displays the total of chained words', () => {
    render(<GameEnd score={5} onPlayClick={() => {}} />)

    screen.getByRole('heading', { name: /Has encadenado 5 palabras/i })
  })

  it('clicking the "play again" button calls "onPlayClick"', () => {
    const onPlayClick = jest.fn()
    render(<GameEnd score={5} onPlayClick={onPlayClick} />)

    fireEvent.click(screen.getByRole('button', { name: /jugar/i }))

    expect(onPlayClick).toHaveBeenCalled()
  })
})