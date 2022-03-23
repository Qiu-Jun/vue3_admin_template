/*
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-23 20:37:02
 * :Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import router from './router'
import store from './store/index'
import 'virtual:svg-icons-register'

import mockXHR from '../mock/index.js'
// eslint-disable-next-line import/order
// import { getToken } from '@/utils/auth.js'
mockXHR()

// const whiteList = ['/login']
// router.beforeEach(async (to, from, next) => {
//     const hasToken = getToken()
//     if (hasToken) {
//         if (to.path === '/login') {
//             next({ path: '/home' })
//         } else {
//             const hasRoles = store.getters.roles && store.getters.roles.length > 0
//             if (hasRoles) {
//                 next()
//             } else {
//                 try {
//                     // 动态生成路由
//                     // const accessRoutes = await store.dispatch('permission/generateRoutes', menus)
//                 } catch (err) {
//                     next(`/login?redirect=${to.path}`)
//                 }
//             }
//         }
//     } else if (whiteList.indexOf(to.path) !== -1) {
//         // in the free login whitelist, go directly
//         next()
//     } else {
//         next(`/login?redirect=${to.path}`)
//     }
// })

async function bootstrap() {
    const app = createApp(App)
    app.use(store)
    app.use(router)
    app.mount('#app')
}
bootstrap()
