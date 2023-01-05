import type { ComponentProps } from 'react'

export type WarnLevel = 'alert' | 'warn' | 'ok'

export type Words = { [key: string]: string }

export type IconProps = {
  size?: number
  color?: string
} & ComponentProps<'svg'>

export type MessageType = 'default' | 'invalid' | 'duplicated'
