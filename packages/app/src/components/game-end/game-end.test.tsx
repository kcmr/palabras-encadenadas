import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as nativeShareModule from '../../hooks/use-native-share'
import { GameEnd } from './game-end'

const user = userEvent.setup({ delay: null })

describe('GameEnd', () => {
  it('Displays the total of chained words', () => {
    render(<GameEnd score={5} onPlayClick={() => {}} />)

    screen.getByRole('heading', { name: /Has encadenado 5 palabras/i })
  })

  it('Displays the correct share heading for scores greater than 0', () => {
    render(<GameEnd score={5} onPlayClick={() => {}} />)

    screen.getByRole('heading', { name: /compártelo/i })
  })

  it('Displays a different share heading for score equal to 0', () => {
    render(<GameEnd score={0} onPlayClick={() => {}} />)

    expect(screen.queryByRole('heading', { name: /compártelo/i })).not.toBeInTheDocument()
  })

  it('Displays a native share button in supporting clients', async () => {
    const nativeShare = jest.fn()
    jest.spyOn(nativeShareModule, 'useNativeShare').mockImplementationOnce(() => ({
      canUseNativeShare: true,
      share: nativeShare,
    }))

    render(<GameEnd score={0} onPlayClick={() => {}} />)

    await user.click(screen.getByRole('button', { name: /compartir/i }))

    expect(nativeShare).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://palabras-encadenadas.app' })
    )
  })

  it('clicking the "play again" button calls "onPlayClick"', async () => {
    const onPlayClick = jest.fn()
    render(<GameEnd score={5} onPlayClick={onPlayClick} />)

    await user.click(screen.getByRole('button', { name: /jugar/i }))

    expect(onPlayClick).toHaveBeenCalled()
  })
})
