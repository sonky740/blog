export default [
  {
    languageOptions: {
      globals: {
        __PATH_PREFIX__: 'readonly',
      },
    },
  },
  {
    files: ['src/@types/graphqlTypes.d.ts'],
    rules: {
      semi: ['warn', 'always'],
    },
  },
  {
    ignores: ['.cache', 'public', 'node_modules', 'build', 'dist'],
  },
];
