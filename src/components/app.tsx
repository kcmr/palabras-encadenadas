import { useEffect, useState } from 'react'
import { MessageType, Words } from '../types'
import { Timer } from './timer'
import { Points } from './points'
import { Layout } from './layout'
import { WordForm } from './word-form'
import { getWords } from '../api/words'
import { setRemainingTimeWarnLevel } from '../utils'
import * as classes from './app.module.css'
import { ArrowIcon } from '../icons/arrow-icon'

const SECONS_PER_WORD = 10

const messages = new Map<MessageType, string>([
  ['default', 'Escribe una palabra y pulsa intro'],
  ['invalid', 'No tenemos esa palabra en la lista'],
  ['duplicated', 'Palabra repe'],
])

export const App = () => {
  const [words, setWords] = useState<Words | null>(null)
  const [timerKey, setTimerKey] = useState('timer')
  const [timerStarted, setTimerStarted] = useState(false)
  const [usedWords, setUsedWords] = useState(new Set())
  const [message, setMessage] = useState(messages.get('default'))

  useEffect(() => {
    getWords().then(setWords)
  }, [])

  const restartTimer = () => setTimerKey(Math.random().toString(36).slice(2))

  const handleWordSubmit = (word: string, callback: VoidFunction) => {
    if (!(word in words!)) {
      setMessage(messages.get('invalid'))
      return
    }

    if (usedWords.has(word)) {
      setMessage(messages.get('duplicated'))
      return
    }

    setUsedWords(new Set(usedWords.add(word)))
    restartTimer()
    callback()
  }

  const handleFirstInput = () => {
    setTimerStarted(true)
    restartTimer()
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
      <div className={classes.messages}>
        <ArrowIcon size={22} className={classes.arrow} color="var(--fg-color)" />
        <span className={classes.message}>{message}</span>
      </div>
    </>
  )

  return <Layout>{content}</Layout>
}
