module.exports = {
  extends: ['expo', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/no-unused-prop-types': 'error',
  },
};
