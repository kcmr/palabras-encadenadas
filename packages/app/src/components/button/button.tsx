import classnames from 'classnames'
import { forwardRef } from 'react'
import * as classes from './button.module.css'
import type { ComponentProps, ReactNode } from 'react'

type ButtonProps = {
  outlined?: boolean
  icon?: ReactNode
  children: ReactNode
} & ComponentProps<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { outlined = false, icon, children, ...rest },
  ref
) {
  const buttonClass = classnames({
    [classes.button]: true,
    [classes.outlined]: outlined,
  })

  return (
    <button ref={ref} {...rest} className={classnames(rest.className, buttonClass)}>
      <span className={classes.icon}>{icon}</span>
      {children}
    </button>
  )
})
