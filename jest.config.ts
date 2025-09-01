export {};
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  testMatch: ["**/src/**/*.test.(ts|tsx)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__tests__/__mocks__/fileMock.js",
  },

  collectCoverage: true,
  coverageDirectory: "reports/coverage",
  coverageReporters: ["text", "json-summary"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      { tsconfig: "tsconfig.json", isolatedModules: true },
    ],
  },
};
