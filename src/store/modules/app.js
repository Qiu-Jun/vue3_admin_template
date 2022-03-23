/*
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-24 00:00:34
 * :Description:
 */
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

const useApp = defineStore({
    id: 'app', // id必填，且需要唯一
    state: () => ({
        sidebar: {
            opened: Cookies.get('sidebarStatus')
                ? !!+Cookies.get('sidebarStatus')
                : true,
            withoutAnimation: false
        },
        device: 'desktop'
    }),

    actions: {
        toggleSideBar() {
            this.sidebar.opened = !this.sidebar.opened
            this.sidebar.withoutAnimation = false
            if (this.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
        },
        closeSideBar(withoutAnimation) {
            Cookies.set('sidebarStatus', 0)
            this.sidebar.opened = false
            this.sidebar.withoutAnimation = withoutAnimation
        },
        toggleDevice(device) {
            this.device = device
        }
    }
})

export default useApp
