import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Timer } from './timer'

const ONE_SECOND = 1000

describe('Timer', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
    })
  })

  it('displays the count start', () => {
    render(<Timer countStart={10} />)

    screen.getByText('10')
  })

  it('setting started to true starts the countdown', () => {
    render(<Timer countStart={10} started />)

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND)
    })

    expect(screen.getByText('9')).toBeInTheDocument()
  })

  it('calls onTick after started and on each count down interval', () => {
    const onTick = jest.fn()
    render(<Timer countStart={10} onTick={onTick} started />)

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND * 2)
    })

    expect(onTick).toHaveBeenCalledTimes(2)
  })
})
