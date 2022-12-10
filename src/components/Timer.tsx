import { ComponentPropsWithoutRef, useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

const ONE_SECOND = 1000

type TimerProps = {
  onTick: (timeLeft: number) => void
  countStart: number
  started: boolean
} & ComponentPropsWithoutRef<'span'>

export const Timer = ({ onTick, countStart, started, ...rest }: TimerProps) => {
  const [timeLeft, { startCountdown }] = useCountdown({
    countStart,
    intervalMs: ONE_SECOND,
  })

  useEffect(() => {
    if (started) {
      startCountdown()
    }
  }, [startCountdown])

  onTick(timeLeft)

  return <span {...rest}>{timeLeft}</span>
}
