import classnames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getWords } from '../../api/words'
import { useRandomString } from '../../hooks/use-random-string'
import { removeAccents, setRemainingTimeWarnLevel } from '../../utils'
import { themeColor } from '../../utils/theme-color'
import { Form } from '../form'
import { GameEnd } from '../game-end'
import { GameInfo } from '../game-info'
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
  const [gameFinished, setGameFinished] = useState(false)
  const [timerStarted, setTimerStarted] = useState(false)
  const [usedWords, setUsedWords] = useState(new Set())
  const [message, setMessage] = useState(messages.get('default'))

  const formRef = useRef<{ clearInput: VoidFunction } | null>(null)
  const resetForm = () => formRef.current?.clearInput()

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

  const handleFormChange = () => {
    if (!timerStarted) {
      setTimerStarted(true)
    }
    if (usedWords.size > 0) {
      setMessage(undefined)
    }
  }

  const handleTimerTick = useCallback((remainingSeconds: number) => {
    if (remainingSeconds === 0) {
      finishGame()
    }
    setRemainingTimeWarnLevel(remainingSeconds)
  }, [])

  const finishGame = () => {
    setGameFinished(true)
    setTimerStarted(false)
    themeColor.set('#fff')
    document.body.classList.add('no-transition')
  }

  const restartGame = () => {
    setGameFinished(false)
    restartTimer()
    resetForm()
    setFirstSilabe('')
    setMessage(messages.get('default'))
    setUsedWords(new Set())
    themeColor.unset()
    setTimeout(() => {
      document.body.classList.remove('no-transition')
    })
  }

  const isInvalidWord = errorMessages.includes(message)
  const formClasses = classnames({
    animate__animated: true,
    animate__headShake: isInvalidWord,
  })

  const content = !words ? (
    <p>Cargando diccionario…</p>
  ) : (
    <>
      {gameFinished && (
        <GameEnd
          score={usedWords.size > 0 ? usedWords.size - 1 : 0}
          onPlayClick={restartGame}
        />
      )}
      <GameInfo />
      <Timer
        className={classes.timer}
        countStart={SECONS_PER_WORD}
        onTick={handleTimerTick}
        key={timerKey}
        started={timerStarted}
      />
      <Points
        className={classes.points}
        total={usedWords.size}
        data-testid="total-words"
      />
      <Form
        formRef={formRef}
        disabled={gameFinished}
        className={formClasses}
        onChange={handleFormChange}
        onWordSubmit={handleWordSubmit}
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
