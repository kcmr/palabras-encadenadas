import { Words } from '../types'

export async function getWords(): Promise<Words> {
  const { words } = await import('./data/words.json')
  return words
}
