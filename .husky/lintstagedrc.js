/*
 * :Author: June
 * :Date: 2022-03-23 13:28:15
 * :LastEditTime: 2022-03-23 13:28:15
 * :Description:
 */
module.exports = {
    '*.{js,jsx,ts,tsx}': ['prettier --write'],
    '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
        'prettier --write--parser json'
    ],
    'package.json': ['prettier --write'],
    '*.vue': ['prettier --write'],
    '*.{scss,less,styl,html}': ['prettier --write'],
    '*.md': ['prettier --write']
}
