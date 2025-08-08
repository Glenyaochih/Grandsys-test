/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // 指定使用 ts-jest preset 來處理 TypeScript 檔案
  preset: 'ts-jest',

  // 指定測試執行的環境，如果是 React 專案，通常是 'jsdom'
  testEnvironment: 'jsdom',

  // 這行很重要，它告訴 Jest 去處理 node_modules 裡的一些 ESM 模組
  // 如果你遇到 import 的錯誤，可以嘗試加入這個配置
  transformIgnorePatterns: ['node_modules/(?!(.*@testing-library)/)'],

  // 告訴 Jest 測試檔案的模式
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

  // 如果你需要使用 `setupTests.ts` 這個檔案，可以在這裡指定
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
};
