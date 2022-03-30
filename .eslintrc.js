/*
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-30 00:01:00
 * :Description:
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        // 'plugin:vue/essential', 非vue3用这个
        'plugin:vue/vue3-essential',
        'airbnb-base',
        'plugin:prettier/recommended' // 添加 prettier 插件
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['vue'],
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src', '@/styles']]
            }
        }
    },
    globals: {
        // setup 无需import
        defineProps: true,
        defineEmits: true
    },
    rules: {
        'no-param-reassign': 0, // 进制给参数重新赋值
        'no-dupe-keys': 1, // 禁止对象字面量中出现重复的 key 0 1 = warning 2 = error
        'no-shadow': 1, // 外部作用域中的变量不能与它所包含的作用域中的变量或形参同名
        'no-unused-expressions': 0,
        'prettier/prettier': 2,
        'prefer-rest-params': 0,
        'global-require': 0,
        'no-restricted-syntax': 0,
        'import/extensions': 0,
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: true,
                peerDependencies: true
            }
        ],
        'import/no-unresolved': 0,
        'import/order': 0,
        'vue/multi-word-component-names': 'off', // hellow-world
        'vue/no-dupe-keys': 0
    }
}
