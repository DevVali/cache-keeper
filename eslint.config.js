import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            semi: ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',
            quotes: ['error', 'single', { avoidEscape: true }],
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    { ignores: ['bun.lockb', 'lib'] },
];
