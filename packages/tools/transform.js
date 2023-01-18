import fs from 'fs/promises'
import words from './data/words.json' assert { type: 'json' }

const excludedTypes = [
  'abreviatura',
  'adverbio',
  'anticuado',
  'artículo',
  'aumentativodiminutivo',
  'compuesto',
  'conjugado',
  'conjunción',
  'contracción',
  'expresión',
  'frase',
  'interjección',
  'locución',
  'onomatopeya',
  'preposición',
  'pronombre',
  'propio',
  'topónimo',
]

async function run() {
  const output = {
    words: {},
    largestWordLength: 0,
    largestWord: '',
  }

  const lastSilabesWithMatchingWord = new Set()

  for (const word of words) {
    if (
      hasMinCharsLength(word) &&
      isSingleWord(word) &&
      isNotPlural(word) &&
      isNotExcludedType(word)
    ) {
      const lastSilabe = removeAccents(getLastSilabe(word))
      lastSilabesWithMatchingWord.add(lastSilabe)
      output.words[removeAccents(word.palabra)] = lastSilabe

      if (word.palabra.length > output.largestWordLength) {
        output.largestWordLength = word.palabra.length
        output.largestWord = word.palabra
      }
    }
  }

  const wordList = Object.keys(output.words)
  const matchingEndings = new Set()

  for (const [silabe] of lastSilabesWithMatchingWord.entries()) {
    for (const word of wordList) {
      if (word.startsWith(silabe)) {
        matchingEndings.add(silabe)
      }
    }
  }

  const matches = Array.from(matchingEndings)

  printInfo(output, lastSilabesWithMatchingWord, matches)

  return Promise.all([
    fs.writeFile('output/matching-silabes.json', JSON.stringify(matches), 'utf-8'),
    fs.writeFile('output/words.json', JSON.stringify(output), 'utf-8'),
  ])
}

function getLastSilabe(word) {
  return word['sílabas'].split(' ').pop().replace('*', '').replace(/^rr/, 'r')
}

function hasMinCharsLength(word) {
  return word.palabra.length > 3
}

function isSingleWord(word) {
  return !word.palabra.includes(' ')
}

function isNotPlural(word) {
  return word['número'] !== 'plural'
}

function isNotExcludedType(word) {
  return !word.tipo.split('/').some((w) => excludedTypes.includes(w))
}

function removeAccents(str) {
  return str
    .replaceAll('ñ', '\\001')
    .replaceAll('ü', '\\002')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replaceAll('\\001', 'ñ')
    .replaceAll('\\002', 'ü')
}

function printInfo(output, lastSilabesWithMatchingWord, matches) {
  console.log('===============================================')
  console.log('Total words:', Object.keys(output.words).length)
  console.log('Total endings:', lastSilabesWithMatchingWord.size)
  console.log('Total endings with matching word:', matches.length)
  console.log(`Largest word: ${output.largestWord} (${output.largestWordLength} letters)`)
  console.log('===============================================\n')
}

run()
  .then(() => {
    console.log('🎉 Output generated!')
  })
  .catch(console.error)
