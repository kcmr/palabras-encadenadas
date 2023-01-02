import * as classes from './layout.module.css'
import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <main className={classes.main}>{children}</main>
)
