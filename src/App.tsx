import { WordForm } from './components/WordForm'
import { Timer } from './components/Timer'
import { useEffect, useState } from 'react'
import * as classes from './App.module.css'
import { Points } from './components/Points'

const SECONS_PER_WORD = 10

type WarnLevel = 'alert' | 'warn' | 'ok'

type Words = { [key: string]: string }

function setRemainingTimeWarnLevel(seconds: number) {
  const timeWarnLevels = new Map<number, WarnLevel>([
    [10, 'ok'],
    [6, 'warn'],
    [3, 'alert'],
  ])

  if (timeWarnLevels.has(seconds)) {
    document.documentElement.style.setProperty(
      '--bg-color',
      `var(--bg-color-${timeWarnLevels.get(seconds)})`
    )
  }
}

export const App = () => {
  const [words, setWords] = useState<Words | null>(null)
  const [timerKey, setTimerKey] = useState('timer')
  const [timerStarted, setTimerStarted] = useState(false)
  const [usedWords, setUsedWords] = useState(new Set())

  useEffect(() => {
    async function loadWords() {
      const { words } = await import('./assets/words.json')
      return words
    }

    loadWords().then(setWords)
  }, [])

  const restartTimer = () => setTimerKey(Math.random().toString(36).slice(2))

  const handleWordSubmit = (word: string, callback: VoidFunction) => {
    if (!(word in words)) {
      return
    }

    if (usedWords.has(word)) {
      alert('Palabra repe!')
      return
    }

    setUsedWords(new Set(usedWords.add(word)))
    restartTimer()
    callback()
  }

  const handleInputStart = () => {
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
      <WordForm words={words} onWordSubmit={handleWordSubmit} onFirstInput={handleInputStart} />
    </main>
  )
}
