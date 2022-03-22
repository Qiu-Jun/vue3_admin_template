/*
 * :Author: June
 * :Date: 2022-03-22 13:54:12
 * :LastEditTime: 2022-03-22 13:54:13
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
