/*
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-30 01:44:57
 * :Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/reset.css'
import '@/styles/index.scss'
import router from './router'
import store from './store/index'
import routerEach from './router/routerEach'
import 'virtual:svg-icons-register'

import mockXHR from '../mock/index.js'

mockXHR()

async function bootstrap() {
    const app = createApp(App)
    app.use(store)
    app.use(router)
    await routerEach(router)
    app.mount('#app')
}
bootstrap()
