module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true
  },
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'no-console': 'off'
  }
};
