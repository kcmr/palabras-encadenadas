import { useState } from 'react'

export const useRandomString = (initialValue: string): [string, VoidFunction] => {
  const [key, setKey] = useState(initialValue)

  const setRandomKey = () => setKey(Math.random().toString(36).slice(2))

  return [key, setRandomKey]
}
