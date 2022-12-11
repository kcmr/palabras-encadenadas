import classnames from 'classnames'
import { ComponentProps } from 'react'
import * as classes from './points.module.css'

type PointProps = {
  total: number
} & ComponentProps<'p'>

export const Points = ({ total, ...rest }: PointProps) => {
  return (
    <p {...rest} className={classnames(classes.points, rest.className)}>
      <span className={classes.number}>{total}</span> palabra(s)
    </p>
  )
}
