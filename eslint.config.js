const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const jest = require('eslint-plugin-jest');

module.exports = [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            jest: jest,
        },
        rules: {
            // TypeScript specific rules
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-inferrable-types': 'off',

            // General ESLint rules
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-unused-vars': 'off',
            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: 'error',
            curly: 'error',

            // Code style
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'comma-dangle': ['off', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
        },
    },
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        plugins: {
            jest: jest,
        },
        rules: {
            'jest/expect-expect': 'error',
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error',
        },
    },
    {
        ignores: [
            'dist/',
            'coverage/',
            'node_modules/',
            '*.js',
            '*.d.ts',
            'scripts/',
        ],
    },
];
