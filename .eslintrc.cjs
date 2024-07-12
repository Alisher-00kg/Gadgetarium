module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
   ],
   overrides: [
      {
         env: {
            node: true,
         },
         files: ['.eslintrc.{js,cjs}'],
         parserOptions: {
            sourceType: 'script',
         },
      },
   ],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react'],
   rules: {
      'no-var': 'error',
      'no-unused-vars': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'off',

      'prettier/prettier': [
         'error',
         {
            endOfLine: 'auto',
         },
      ],
   },
};
