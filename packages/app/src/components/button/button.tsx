import classnames from 'classnames'
import { forwardRef } from 'react'
import * as classes from './button.module.css'
import type { ComponentProps, ReactNode } from 'react'

type ButtonProps = {
  outlined?: boolean
  transparent?: boolean
  icon?: ReactNode
  children?: ReactNode
} & ComponentProps<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { outlined = false, transparent = false, icon, children, ...rest },
  ref
) {
  const buttonClass = classnames({
    [classes.button]: true,
    [classes.outlined]: outlined,
    [classes.transparent]: transparent,
  })

  return (
    <button ref={ref} {...rest} className={classnames(buttonClass, rest.className)}>
      <span className={classes.icon}>{icon}</span>
      {children}
    </button>
  )
})
