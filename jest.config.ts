import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    'node_modules',
    'dist',
  ],
  testTimeout: 10000,
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    "./src/api/tests/testsSetup.ts"
  ],
};

export default config;
