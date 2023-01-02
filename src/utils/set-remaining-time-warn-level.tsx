import type { WarnLevel } from '../types'

type Seconds = number

export function setRemainingTimeWarnLevel(seconds: Seconds) {
  const timeWarnLevels = new Map<Seconds, WarnLevel>([
    [10, 'ok'],
    [6, 'warn'],
    [3, 'alert'],
  ])

  if (timeWarnLevels.has(seconds)) {
    document.documentElement.style.setProperty(
      '--bg-color',
      `var(--bg-color-${timeWarnLevels.get(seconds)})`
    )
  }
}
