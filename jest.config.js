module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // testMatch: ['src/*.test.ts', 'src/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
};
