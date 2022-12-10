import { WordForm } from './components/WordForm'
import { Timer } from './components/Timer'
import { useEffect, useState } from 'react'
import * as classes from './App.module.css'
import { Points } from './components/Points'
import { getWords } from './api/words'
import { Words } from './types'
import { setRemainingTimeWarnLevel } from './utils'

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
    if (word in words!) {
      if (usedWords.has(word)) {
        alert('Palabra repe')
      } else {
        setUsedWords(new Set(usedWords.add(word)))
        restartTimer()
        callback()
      }
    }
  }

  const handleFirstInput = () => {
    setTimerStarted(true)
    restartTimer()
  }

  if (!words) {
    return <p>Cargando diccionario…</p>
  }

  return (
    <main className={classes.main}>
      <Points className={classes.points} total={usedWords.size} />
      <Timer
        className={classes.timer}
        countStart={SECONS_PER_WORD}
        onTick={setRemainingTimeWarnLevel}
        key={timerKey}
        started={timerStarted}
      />
      <WordForm words={words} onWordSubmit={handleWordSubmit} onFirstInput={handleFirstInput} />
    </main>
  )
}
