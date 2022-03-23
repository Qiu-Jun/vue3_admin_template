/*
 * :Author: June
 * :Date: 2022-03-14 15:42:05
 * :LastEditTime: 2022-03-23 23:39:59
 * :Description:
 */
import defaultSettings from '@/config/settings/app'
import { defineStore } from 'pinia'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const useSettings = defineStore({
    id: 'settings',

    state: () => ({
        showSettings,
        tagsView,
        fixedHeader,
        sidebarLogo
    }),

    actions: {
        changeSetting({ key, value }) {
            if (this[key]) {
                this[key] = value
            }
        }
    }
})

export default useSettings
