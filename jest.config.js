// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  // testPathIgnorePatterns: ['<rootDir>/src/next-auth'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'cjs', 'jsx', 'json', 'node'],
  rootDir: '.',
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/src/components/common/$1',
    '@main/(.*)': '<rootDir>/src/components/main/$1',
    '@place/(.*)': '<rootDir>/src/components/place/$1',
    '@review/(.*)': '<rootDir>/src/components/review/$1',
    '@navigation/(.*)': '<rootDir>/src/components/navigation/$1',
    '@mypage/(.*)': '<rootDir>/src/components/mypage/$1',
    '@map/(.*)': '<rootDir>/src/components/map/$1',
    '@pages/(.*)': '<rootDir>/pages/$1',
    '@utils/(.*)': '<rootDir>/src/components/utils/$1',
    '@types/(.*)': '<rootDir>/src/components/types/$1',
    '@styles/(.*)': '<rootDir>/src/components/styles/$1',
    '@layout/(.*)': '<rootDir>/src/components/layout/$1',
    '@images/(.*)': '<rootDir>/public/images/$1'
  }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
