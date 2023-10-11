module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['flowtype', 'react'],
    rules: {
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function'
            }
        ],
        'max-len': [
            'error',
            {
                code: 200
            }
        ],
        'arrow-parens': ['error', 'as-needed'],
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true
            }
        ],
        'object-curly-newline': [
            'error',
            {
                consistent: true
            }
        ],
        'implicit-arrow-linebreak': 2,
        'operator-linebreak': 2,
        'linebreak-style': 0,
        'import/no-extraneous-dependencies': 2,
        'import/prefer-default-export': 2,
        'react/forbid-prop-types': [
            2,
            {
                forbid: ['any']
            }
        ],
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.js', '.jsx']
            }
        ],
        'react/jsx-props-no-spreading': 2,
        'react/jsx-curly-newline': 2,
        'react/static-property-placement': 0,
        'react/state-in-constructor': 0,
        'react/no-array-index-key': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/control-has-associated-label': 0,
        'react/prop-types': 2,
        'no-param-reassign': 0,
        'consistent-return': 0
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    }
};
