module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:jest/recommended', 'plugin:react/recommended', 'prettier'],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {
      functions: false
    }],
    // We use named functions for React components, so avoid preferring arrow callbacks
    // for those
    'prefer-arrow-callback': 'off',
  },
};
