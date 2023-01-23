const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./src",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);