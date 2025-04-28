export default {
  testEnvironment: 'node',
  transform: {},
  // Remove the 'extensionsToTreatAsEsm' setting that's causing the error
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  verbose: true,
};