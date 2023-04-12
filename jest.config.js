module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest should use to detect test files
  testMatch: ['**/__tests__/**/*.tsx?(x)', '**/?(*.)+(spec|test).tsx?(x)'],

  // The directories where Jest should look for tests
  roots: ['<rootDir>/src'],

  // The transform config tells Jest how to transform files before running tests
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.css$': 'jest-css-modules-transform',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // The setupFilesAfterEnv config specifies any additional setup files
  // that should be run before Jest starts running tests
  //setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // The coverage report config specifies how coverage data should be collected and reported
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],

  // The moduleDirectories config specifies additional directories to include when resolving modules
  moduleDirectories: ['node_modules', 'src'],

  // The moduleNameMapper config maps import statements to a different path
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
}
