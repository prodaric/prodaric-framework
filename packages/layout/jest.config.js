/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleNameMapper: {},
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/__tests__/**'],
};
