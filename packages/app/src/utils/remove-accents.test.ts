import { removeAccents } from './remove-accents'

describe('removeAccents()', () => {
  it('removes acute accents', () => {
    const actual = removeAccents('áéíóú ÁÉÍÓÚ')
    const expected = 'aeiou AEIOU'

    expect(actual).toEqual(expected)
  })

  it('preserves ü and ñ characters', () => {
    const actual = removeAccents('cigüeña')

    expect(actual).toEqual(actual)
  })
})
