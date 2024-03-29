import classnames from 'classnames'
import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'
import { AlarmIcon } from '../../icons'
import * as classes from './timer.module.css'
import type { ComponentProps } from 'react'

const ONE_SECOND = 1000

type TimerProps = {
  onTick?: (timeLeft: number) => void
  countStart: number
  started?: boolean
} & ComponentProps<'div'>

export const Timer = ({ onTick, countStart, started = false, ...rest }: TimerProps) => {
  const [timeLeft, { startCountdown }] = useCountdown({
    countStart,
    intervalMs: ONE_SECOND,
  })

  useEffect(() => {
    if (started) {
      startCountdown()
    }
  }, [startCountdown, started])

  useEffect(() => {
    onTick?.(timeLeft)
  }, [timeLeft, onTick])

  return (
    <div {...rest} className={classnames(classes.timer, rest.className)}>
      <span className="visually-hidden" id="timer-label">
        Segundos restantes
      </span>
      <span className={classes.text} role="timer" aria-labelledby="timer-label">
        {timeLeft}
      </span>
      <AlarmIcon size={20} aria-hidden="true" />
    </div>
  )
}
