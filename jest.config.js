module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/helpers",
    "/__tests__/.*mocks.*"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
