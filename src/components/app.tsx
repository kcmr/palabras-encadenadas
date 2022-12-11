import { useEffect, useState } from 'react'
import { Words } from '../types'
import { Timer } from './timer'
import { Points } from './points'
import { Layout } from './layout'
import { WordForm } from './word-form'
import { getWords } from '../api/words'
import { setRemainingTimeWarnLevel } from '../utils'
import * as classes from './app.module.css'

const SECONS_PER_WORD = 10

export const App = () => {
  const [words, setWords] = useState<Words | null>(null)
  const [timerKey, setTimerKey] = useState('timer')
  const [timerStarted, setTimerStarted] = useState(false)
  const [usedWords, setUsedWords] = useState(new Set())

  useEffect(() => {
    getWords().then(setWords)
  }, [])

  const restartTimer = () => setTimerKey(Math.random().toString(36).slice(2))

  const handleWordSubmit = (word: string, callback: VoidFunction) => {
    if (!(word in words!)) {
      // TODO -> alert "not found"
      return
    }

    if (usedWords.has(word)) {
      // TODO -> alert palabra repe
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
    </>
  )

  return <Layout>{content}</Layout>
}
