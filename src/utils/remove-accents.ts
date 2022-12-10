export function removeAccents(str: string): string {
  return str
    .replaceAll('ñ', '\\001')
    .replaceAll('ü', '\\002')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replaceAll('\\001', 'ñ')
    .replaceAll('\\002', 'ü')
}
