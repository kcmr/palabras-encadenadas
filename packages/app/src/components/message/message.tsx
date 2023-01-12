import classnames from 'classnames'
import { AlertIcon, ArrowIcon } from '../../icons'
import * as classes from './message.module.css'
import type { ComponentProps, ReactNode } from 'react'

type MessageProps = {
  type?: 'info' | 'error'
  children: ReactNode
} & ComponentProps<'div'>

export const Message = ({ type = 'info', children, ...rest }: MessageProps) => (
  <div {...rest} className={classnames(classes.message, rest.className)}>
    <Icon type={type} />
    <span className={classes.text}>{children}</span>
  </div>
)

const Icon = ({ type }: { type: MessageProps['type'] }) => {
  if (type === 'info') {
    return (
      <ArrowIcon
        data-testid="info"
        size={22}
        className={classes.arrow}
        aria-hidden="true"
      />
    )
  }

  return <AlertIcon size={18} aria-label="Error" role={'img'} data-testid="error" />
}
