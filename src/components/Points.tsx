import { ComponentPropsWithoutRef } from 'react'
import * as classes from './points.module.css'

type PointProps = {
  total: number
} & ComponentPropsWithoutRef<'p'>

export const Points = ({ total, ...rest }: PointProps) => {
  return (
    <p {...rest} className={`${classes.points} ${rest.className ?? ''}`}>
      <span className={classes.number}>{total}</span> palabra(s)
    </p>
  )
}
