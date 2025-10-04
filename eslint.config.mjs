import next from 'eslint-config-next'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...next(),
  {
    rules: {
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
]

export default config
