import { ComponentPropsWithoutRef } from 'react'

type PointProps = {
  total: number
} & ComponentPropsWithoutRef<'span'>

export const Points = ({ total, ...rest }: PointProps) => {
  return <span {...rest}>{total} palabra(s)</span>
}
