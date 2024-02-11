import type { Config } from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '\\.(jpg|png|gif|svg|mp4)$': 'identity-obj-proxy',
  },
};

export default config;
