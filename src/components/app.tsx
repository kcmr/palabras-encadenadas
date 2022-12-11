import { useEffect, useState } from 'react'
import { getWords } from '../api/words'
import { useRandomString } from '../hooks/use-random-string'
import { MessageType, Words } from '../types'
import { setRemainingTimeWarnLevel } from '../utils'
import * as classes from './app.module.css'
import { Layout } from './layout'
import { Message } from './message'
import { Points } from './points'
import { Timer } from './timer'
import { WordForm } from './word-form'

const SECONS_PER_WORD = 10

const messages = new Map<MessageType, string>([
  ['default', 'Escribe una palabra y pulsa intro'],
  ['invalid', 'No tenemos esa palabra en la lista'],
  ['duplicated', 'Palabra repe'],
])

export const App = () => {
  const [words, setWords] = useState<Words | null>(null)
  const [timerKey, restartTimer] = useRandomString('timer')
  const [timerStarted, setTimerStarted] = useState(false)
  const [usedWords, setUsedWords] = useState(new Set())
  const [message, setMessage] = useState(messages.get('default'))

  useEffect(() => {
    getWords().then(setWords)
  }, [])

  const handleWordSubmit = (word: string, callback: VoidFunction) => {
    if (validateWord(word)) {
      setUsedWords(new Set(usedWords.add(word)))
      restartTimer()
      callback()
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

  const getMessageType = (message = '') => {
    const errorMessages = [messages.get('invalid'), messages.get('duplicated')]
    return errorMessages.includes(message) ? 'error' : 'info'
  }

  const content = !words ? (
    <p>Cargando diccionario…</p>
  ) : (
    <>
      <Points className={classes.points} total={usedWords.size} />
      <Timer
        className={classes.timer}
        countStart={SECONS_PER_WORD}
        onTick={setRemainingTimeWarnLevel}
        key={timerKey}
        started={timerStarted}
      />
      <WordForm words={words} onWordSubmit={handleWordSubmit} onFirstInput={handleFirstInput} />
      <Message
        className={classes.messages}
        hidden={!Boolean(message)}
        type={getMessageType(message)}
      >
        {message}
      </Message>
    </>
  )

  return <Layout>{content}</Layout>
}
