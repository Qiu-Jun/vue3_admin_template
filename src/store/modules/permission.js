/*
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-23 22:22:14
 * :Description:
 */
import { constantRoutes } from '@/router/index.js'
import { defineStore } from 'pinia'

const asyncRoutes = ''
/**
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some((role) => route.meta.roles.includes(role))
    }
    return true
}

/**
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach((route) => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const usePermission = defineStore({
    id: 'permission',
    state: () => ({
        routes: [...constantRoutes],
        addRoutes: []
    }),

    actions: {
        generateRoutes(roles) {
            return new Promise((resolve) => {
                let accessedRoutes
                if (roles.includes('admin')) {
                    accessedRoutes = asyncRoutes || []
                } else {
                    // 测试
                    accessedRoutes = filterAsyncRoutes(constantRoutes, roles)
                }
                this.addRoutes = accessedRoutes
                this.routes = constantRoutes.concat(accessedRoutes)
                resolve(accessedRoutes)
            })
        }
    }
})

export default usePermission
