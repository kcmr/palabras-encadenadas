import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import * as classes from './form.module.css'
import type { ChangeEvent, ComponentProps, ReactNode } from 'react'

type FormProps = {
  children?: ReactNode
  disabled?: boolean
  onWordSubmit?: (value: string) => void
  onFirstInput?: () => void
  onChange?: VoidFunction
} & ComponentProps<'form'>

export const Form = ({
  children,
  disabled,
  onWordSubmit,
  onChange,
  ...rest
}: FormProps) => {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (disabled === true) {
      inputRef.current?.blur()
    }
  }, [disabled])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onWordSubmit?.(inputValue)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    onChange?.()
  }

  return (
    <form
      data-testid="form"
      className={classnames(classes.form, rest.className)}
      onSubmit={handleSubmit}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      spellCheck="false"
    >
      <div className={classes.content}>
        <span>{children}</span>
        <label htmlFor="word" className="visually-hidden">
          Palabra o sílabas
        </label>
        <input
          ref={inputRef}
          id="word"
          autoFocus
          type="text"
          disabled={disabled}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </form>
  )
}
