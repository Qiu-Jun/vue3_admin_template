/*
 * :Author: June
 * :Date: 2022-03-23 13:14:09
 * :LastEditTime: 2022-03-23 13:39:49
 * :Description:
 */
module.exports = {
    ignores: [(commit) => commit.includes('init')],
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'perf',
                'docs',
                'refactor',
                'revert',
                'style',
                'chore',
                'test'
            ]
        ],
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [1, 'always'],
        'header-max-length': [2, 'always', 108],
        'subject-empty': [2, 'never'],
        'type-empty': [2, 'never'],
        'subject-case': [0]
    }
}
