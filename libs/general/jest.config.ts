import type { Config } from 'jest';

const config: Config = {
  displayName: 'general',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        useESM: false
      }
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/general',
  collectCoverage: true,  // Enable coverage collection
};

export default config;
