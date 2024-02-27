module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'next',
    ],
    rules: {
      // Добавьте правила на ваше усмотрение
      'indent': ['error', 2], // установите количество пробелов на ваш выбор
    },
  };