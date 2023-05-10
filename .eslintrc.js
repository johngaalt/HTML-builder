module.exports = {
  env: {
    commonjs: true,
    es2015: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ["error", 2],
    semi: ["error", "always"],
  },
};
