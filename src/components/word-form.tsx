import 'animate.css'
import classnames from 'classnames'
import { ChangeEvent, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'
import { removeAccents } from '../utils'
import * as classes from './word-form.module.css'

type WordFormProps = {
  words: { [key: string]: string }
  hasError?: boolean
  onWordSubmit: (word: string, callback: VoidFunction) => void
  onFirstInput?: () => void
  onChange?: VoidFunction
}

export const WordForm = ({
  words,
  hasError = false,
  onWordSubmit,
  onFirstInput,
  onChange,
}: WordFormProps) => {
  const [inputValue, setInputValue] = useState('')
  const [prefix, setPrefix] = useState('')
  const isFirstRender = useIsFirstRender()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const word = `${prefix}${removeAccents(inputValue.toLowerCase())}`

    onWordSubmit(word, () => {
      setPrefix(words[word])
      setInputValue('')
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    onChange?.()
  }

  const formClass = classnames({
    [classes.form]: true,
    animate__animated: true,
    animate__headShake: hasError,
  })

  return (
    <form
      className={formClass}
      onSubmit={handleSubmit}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      spellCheck="false"
    >
      <div className={classes.content}>
        <span>{prefix}</span>
        <label htmlFor="word" className="visually-hidden">
          Palabra o sílabas
        </label>
        <input
          id="word"
          autoFocus
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onInput={() => isFirstRender && onFirstInput?.()}
        />
      </div>
    </form>
  )
}
