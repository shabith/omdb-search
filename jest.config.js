// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const nextJest = require('next/jest');
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  // custom
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/components/**/*{ts,tsx}', '!**/node_modules/**', '!**/*.stories.tsx'],
  moduleNameMapper: {
    '^@app/components/(.*)$': '<rootDir>/components/$1',
    '^@app/lib/(.*)$': '<rootDir>/lib/$1',
    '^@app/services/(.*)$': '<rootDir>/services/$1',
    '^@app/styles/(.*)$': '<rootDir>/styles/$1',
    '^@app/context/(.*)$': '<rootDir>/context/$1',
    '^@app/utils/(.*)$': '<rootDir>/utils/$1',
    '^@app/types$': '<rootDir>/types',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig);
module.exports = createJestConfig(customJestConfig);
