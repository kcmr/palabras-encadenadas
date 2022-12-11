import { ComponentProps, ReactNode } from 'react'
import { ArrowIcon } from '../icons/arrow-icon'
import * as classes from './message.module.css'

type MessageProps = {
  type?: 'info' | 'error'
  children: ReactNode
} & ComponentProps<'div'>

export const Message = ({ type = 'info', children, ...rest }: MessageProps) => {
  return (
    <div {...rest} className={`${classes.message} ${rest.className ?? ''}`}>
      <Icon type={type} />
      <span className={classes.text}>{children}</span>
    </div>
  )
}

const Icon = ({ type }: { type: MessageProps['type'] }) => {
  if (type === 'info') {
    return <ArrowIcon size={22} className={classes.arrow} color="var(--fg-color)" />
  }

  return <span>another</span>
}
