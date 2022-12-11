import { useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'
import { ArrowIcon } from '../icons/arrow-icon'
import { removeAccents } from '../utils'
import * as classes from './word-form.module.css'

type WordFormProps = {
  words: { [key: string]: string }
  onWordSubmit: (word: string, callback: VoidFunction) => void
  onFirstInput?: () => void
}

export const WordForm = ({ words, onWordSubmit, onFirstInput }: WordFormProps) => {
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

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      spellCheck="false"
    >
      <div className={classes.content}>
        <span>{prefix}</span>
        <input
          id="word"
          autoFocus
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onInput={() => isFirstRender && onFirstInput?.()}
        />
      </div>
      <div className={classes.messages}>
        <ArrowIcon size={22} className={classes.arrow} color="var(--fg-color)" />
        <label className={classes.message} htmlFor="word">
          Escribe una palabra y pulsa intro
        </label>
      </div>
    </form>
  )
}
