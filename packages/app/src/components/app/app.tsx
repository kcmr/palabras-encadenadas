import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { getWords } from '../../api/words'
import { useRandomString } from '../../hooks/use-random-string'
import { removeAccents, setRemainingTimeWarnLevel } from '../../utils'
import { Form } from '../form'
import { Layout } from '../layout'
import { Message } from '../message'
import { Points } from '../points'
import { Timer } from '../timer'
import * as classes from './app.module.css'
import type { MessageType, Words } from '../../types'

const SECONS_PER_WORD = 10

const messages = new Map<MessageType, string>([
  ['default', 'Escribe una palabra y pulsa intro'],
  ['invalid', 'Palabra desconocida'],
  ['duplicated', 'Palabra repe'],
])
const errorMessages = [messages.get('invalid'), messages.get('duplicated')]

export const App = () => {
  const [words, setWords] = useState<Words | null>(null)
  const [firstSilabe, setFirstSilabe] = useState('')
  const [timerKey, restartTimer] = useRandomString('timer')
  const [formKey, resetForm] = useRandomString('form')
  const [timerStarted, setTimerStarted] = useState(false)
  const [usedWords, setUsedWords] = useState(new Set())
  const [message, setMessage] = useState(messages.get('default'))

  useEffect(() => {
    getWords().then(setWords)
  }, [])

  const handleWordSubmit = (value: string) => {
    const word = `${firstSilabe}${removeAccents(value.toLowerCase())}`

    if (validateWord(word)) {
      setUsedWords(new Set(usedWords.add(word)))
      restartTimer()
      resetForm()
      setFirstSilabe(words![word])
    }
  }

  const validateWord = (word: string): boolean => {
    if (!(word in words!)) {
      setMessage(messages.get('invalid'))
      return false
    }

    if (usedWords.has(word)) {
      setMessage(messages.get('duplicated'))
      return false
    }

    setMessage(undefined)
    return true
  }

  const handleFirstInput = () => {
    setTimerStarted(true)
    restartTimer()
  }

  const handleFormChange = () => {
    if (usedWords.size > 0) {
      setMessage(undefined)
    }
  }

  const isInvalidWord = errorMessages.includes(message)
  const formClasses = classNames({
    animate__animated: true,
    animate__headShake: isInvalidWord,
  })

  const content = !words ? (
    <p>Cargando diccionario…</p>
  ) : (
    <>
      <Timer
        className={classes.timer}
        countStart={SECONS_PER_WORD}
        onTick={setRemainingTimeWarnLevel}
        key={timerKey}
        started={timerStarted}
      />
      <Points
        className={classes.points}
        total={usedWords.size}
        data-testid="total-words"
      />
      <Form
        key={formKey}
        className={formClasses}
        onChange={handleFormChange}
        onWordSubmit={handleWordSubmit}
        onFirstInput={handleFirstInput}
      >
        {firstSilabe}
      </Form>
      <div className={classes.afterForm}>
        <Message hidden={!Boolean(message)} type={isInvalidWord ? 'error' : 'info'}>
          {message}
        </Message>
      </div>
    </>
  )

  return <Layout>{content}</Layout>
}
