module.exports = {
  extends: ['airbnb-typescript', "prettier"],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-await-in-loop': 'off',
    'prettier/prettier': 'warn',
    'no-restricted-syntax': 'off'
  }
};
