import { act, render, screen } from '@testing-library/react'
import { Timer } from './timer'

const ONE_SECOND = 1000

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers()
      vi.useRealTimers()
    })
  })

  it('displays the count start', () => {
    render(<Timer countStart={10} />)

    screen.getByText('10')
  })

  it('setting started to true starts the countdown', () => {
    render(<Timer countStart={10} started />)

    act(() => {
      vi.advanceTimersByTime(ONE_SECOND)
    })

    expect(screen.getByText('9')).toBeInTheDocument()
  })

  it('calls onTick after started and on each count down interval', () => {
    const onTick = vi.fn()
    render(<Timer countStart={10} onTick={onTick} started />)

    act(() => {
      vi.advanceTimersByTime(ONE_SECOND * 2)
    })

    expect(onTick).toHaveBeenCalledTimes(2)
  })
})
