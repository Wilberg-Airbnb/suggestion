module.exports = {
  verbose:true,
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  testTimeout:20000000,
  setupFilesAfterEnv : ["<rootDir>/test/setupTests.js"],
  transform:{
    "^.+\\.jsx?$": "babel-jest"
  }
};