import { ComponentProps, useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'
import { AlarmIcon } from '../icons'
import classnames from 'classnames'
import * as classes from './timer.module.css'

const ONE_SECOND = 1000

type TimerProps = {
  onTick: (timeLeft: number) => void
  countStart: number
  started: boolean
} & ComponentProps<'div'>

export const Timer = ({ onTick, countStart, started, ...rest }: TimerProps) => {
  const [timeLeft, { startCountdown }] = useCountdown({
    countStart,
    intervalMs: ONE_SECOND,
  })

  useEffect(() => {
    if (started) {
      startCountdown()
    }
  }, [startCountdown, started])

  onTick(timeLeft)

  return (
    <div {...rest} className={classnames(classes.timer, rest.className)}>
      <span className={classes.text}>{timeLeft}</span>
      <AlarmIcon size={20} color="var(--fg-color)" aria-hidden="true" />
    </div>
  )
}
