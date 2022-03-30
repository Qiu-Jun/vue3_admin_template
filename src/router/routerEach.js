/*
 * :Author: June
 * :Date: 2022-03-30 01:02:22
 * :LastEditTime: 2022-03-30 16:58:38
 * :Description:
 */
import useUser from '@/store/modules/user'
import usePermission from '@/store/modules/permission'
import { getToken } from '@/utils/auth.js'

export default function routerEach(router) {
    const userStore = useUser()
    const permissionStore = usePermission()
    const whiteList = ['/login']
    router.beforeEach(async (to, from, next) => {
        const hasToken = getToken()
        if (hasToken) {
            if (to.path === '/login') {
                next({ path: '/dashboard' })
            } else {
                const hasRoles = userStore.roles && userStore.roles.length > 0
                if (hasRoles) {
                    next()
                } else {
                    try {
                        const { roles } = await userStore.getUserInfo()
                        // // 动态生成路由
                        const accessRoutes =
                            await permissionStore.generateRoutes(roles)
                        // addRoutes 已废弃
                        accessRoutes.forEach((route) => {
                            router.addRoute(route)
                        })
                        next({ ...to, replace: true })
                    } catch (err) {
                        next()
                        // next(`/login?redirect=${to.path}`)
                    }
                }
            }
        } else if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    })
}
