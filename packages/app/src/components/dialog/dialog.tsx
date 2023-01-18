import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { CrossIcon } from '../../icons'
import { Button } from '../button'
import * as classes from './dialog.module.css'
import type { ReactNode } from 'react'

type DialogProps = {
  open?: boolean
  header?: ReactNode
  children?: ReactNode
  onClose?: () => void
}

export const Dialog = ({ open, header, children, onClose }: DialogProps) => {
  const [willClose, setWillClose] = useState(false)
  const [willOpen, setWillOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open && !dialogRef.current?.open) {
      dialogRef.current?.showModal()
      requestAnimationFrame(() => setWillOpen(true))
    }
  }, [open])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setWillClose(true)
    dialogRef.current?.addEventListener('transitionend', onDialogTransitionEnd)
  }

  const handleClose = () => {
    setWillClose(false)
    setWillOpen(false)
    onClose?.()
  }

  const dialogClass = classnames({
    [classes.dialog]: true,
    [classes.hidden]: willClose,
    [classes.visible]: willOpen,
  })

  return (
    <dialog ref={dialogRef} onClose={handleClose} className={dialogClass}>
      <form method="dialog" onSubmit={handleFormSubmit} className={classes.header}>
        {header}
        <Button
          autofocus="true"
          aria-label="Cerrar"
          transparent
          className={classes.closeButton}
          icon={<CrossIcon size={20} aria-hidden="true" />}
        />
      </form>

      <div className={classes.content}>{children}</div>
    </dialog>
  )
}

function onDialogTransitionEnd(this: HTMLDialogElement) {
  this.removeEventListener('transitionend', onDialogTransitionEnd)
  this.close()
}
