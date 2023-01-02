import classnames from 'classnames'
import * as classes from './points.module.css'
import type { ComponentProps } from 'react'

type PointProps = {
  total: number
} & ComponentProps<'p'>

export const Points = ({ total, ...rest }: PointProps) => (
  <p {...rest} className={classnames(classes.points, rest.className)}>
    <span className={classes.number}>{total}</span> palabra(s)
  </p>
)
