module.exports = {
  testMatch: ["<rootDir>/test/**/*.test.ts"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
    ".+\\.js$": "babel-jest",
  },
};
