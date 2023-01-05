import classnames from 'classnames'
import { useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'
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
  onFirstInput,
  onChange,
  ...rest
}: FormProps) => {
  const [inputValue, setInputValue] = useState('')
  const isFirstRender = useIsFirstRender()

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
          id="word"
          autoFocus
          type="text"
          disabled={disabled}
          value={inputValue}
          onChange={handleInputChange}
          onInput={() => isFirstRender && onFirstInput?.()}
        />
      </div>
    </form>
  )
}
