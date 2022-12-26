import { useState } from 'react'

export const useRandomString = (initialValue: string): [string, VoidFunction] => {
  const [value, setValue] = useState(initialValue)

  const setRandomValue = () => setValue(Math.random().toString(36).slice(2))

  return [value, setRandomValue]
}
