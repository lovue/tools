import globals from 'globals'
import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    name: 'ESLint Recommended',
    ...js.configs.recommended,
  },
  ...tsEslint.configs.recommended,
  {
    name: 'Stylistic',
    ...stylistic.configs.recommended,
  },
  {
    name: 'Custom Options',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsEslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    name: 'Custom Rules',
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'no-useless-constructor': 'off',
      'no-unused-vars': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'multiline-ternary': 'off',
    },
  },
  {
    ignores: ['**/dist/'],
  },
]
