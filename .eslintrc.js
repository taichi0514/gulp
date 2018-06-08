module.exports = {
  env: {
    es6: true
  },
  extends: ["google", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "linebreak-style": [0],
    camelcase: [0]
  }
};
