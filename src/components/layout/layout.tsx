import { ReactNode } from 'react'
import * as classes from './layout.module.css'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return <main className={classes.main}>{children}</main>
}
