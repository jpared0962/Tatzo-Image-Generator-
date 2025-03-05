module.exports = {
  roots: ['<rootDir>/src/functions'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};