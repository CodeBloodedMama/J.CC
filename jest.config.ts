import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // placering
  testMatch: ["**/src/**/*.test.(ts|tsx)"],

  // Initialiser RTL-matchers osv.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Mock CSS og assets
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/test/__mocks__/fileMock.js",
  },

  // Coverage
  collectCoverage: true,
  coverageDirectory: "reports/coverage",
  coverageReporters: ["text", "lcov", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx", // bootstrap
    "!src/App.tsx", // ren wiring
  ],

  // TS-Jest options (hurtigere, men stadig korrekt)
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      isolatedModules: true,
    },
  },
};

export default config;
