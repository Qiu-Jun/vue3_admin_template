const Mock = require('mockjs')
const { deepClone } = require('../../utils')
const { asyncRoutes } = require('./routes.js')

const routes = deepClone([...asyncRoutes])

const roles = [
    {
        key: 'admin',
        name: 'admin',
        description: '超级管理员可以看到所有路由',
        routes
    },
    {
        key: 'editor',
        name: 'editor',
        description: '只能看到editord的路由',
        routes: routes.filter((i) => i.path !== '/permission') // just a mock
    }
]

module.exports = [
    // mock get all routes form server
    {
        url: '/vue-element-admin/routes',
        type: 'get',
        response: () => {
            return {
                code: 200,
                data: routes
            }
        }
    },

    // mock get all roles form server
    {
        url: '/vue-element-admin/roles',
        type: 'get',
        response: (_) => {
            return {
                code: 20000,
                data: roles
            }
        }
    },

    // add role
    {
        url: '/vue-element-admin/role',
        type: 'post',
        response: {
            code: 20000,
            data: {
                key: Mock.mock('@integer(300, 5000)')
            }
        }
    },

    // update role
    {
        url: '/vue-element-admin/role/[A-Za-z0-9]',
        type: 'put',
        response: {
            code: 20000,
            data: {
                status: 'success'
            }
        }
    },

    // delete role
    {
        url: '/vue-element-admin/role/[A-Za-z0-9]',
        type: 'delete',
        response: {
            code: 20000,
            data: {
                status: 'success'
            }
        }
    }
]
