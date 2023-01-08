import classnames from 'classnames'
import { forwardRef } from 'react'
import * as classes from './button.module.css'
import type { ComponentProps, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
} & ComponentProps<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, ...rest },
  ref
) {
  return (
    <button ref={ref} {...rest} className={classnames(rest.className, classes.button)}>
      {children}
    </button>
  )
})
