export default {
  testEnvironment: "jsdom",
  testTimeout: 10000,
  testMatch: ['<rootDir>/**/*.test.ts', '<rootDir>/**/*.test.tsx'],
  transform: {
    '^.+\\.(ts|tsx||es.js|mjs|js)?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/tsbuild',
    'skip.test.tsx',
    'skip.test.ts',
  ]
};
