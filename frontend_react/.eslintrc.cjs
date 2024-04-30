module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },

    ],
    "require-await": "error",
    "no-var": "error",
    // "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-explicit-any": "error",
    // "@typescript-eslint/ban-ts-ignore": "error",
    // "simple-import-sort/sort": "error",
    "@typescript-eslint/no-unused-vars": ["error", {"args": "none"}],
    "@typescript-eslint/explicit-function-return-type": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-empty-interface": "off",
  },
}
