module.exports = {
  testMatch: ["<rootDir>/src/**/*.test.js"],
  testEnvironment: "node",
  transform: {
    ".+\\.js$": "babel-jest",
  },
};
