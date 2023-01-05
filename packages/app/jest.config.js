/** @type {import('jest').Config} */

module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/test-support/identity-obj-proxy-esm.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  collectCoverageFrom: [
    '**/src/(components|icons)/**/*.tsx',
    '**/src/(utils|hooks)/**/*.ts',
  ],
  coverageReporters: ['text', 'text-summary', 'html-spa'],
}
