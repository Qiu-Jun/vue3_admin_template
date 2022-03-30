/*
 * :Author: June
 * :Date: 2022-03-07 13:03:58
 * :LastEditTime: 2022-03-30 16:59:03
 * :Description:
 */
import { userLogin, userInfo } from '@/apis/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'
import router from '@/router/index'

const useUser = defineStore({
    id: 'user',

    state: () => ({
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        menus: [],
        accesses: []
    }),

    actions: {
        login(userData) {
            const { username, password } = userData
            return new Promise((resolve, reject) => {
                userLogin({ username: username.trim(), password })
                    .then(({ code, data }) => {
                        if (code === 200) {
                            this.token = data
                            setToken(data)
                            resolve()
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        logout() {
            this.token = ''
            this.roles = []
            this.menus = []
            removeToken()
            router.replace({ path: '/login' })
        },

        getUserInfo() {
            return new Promise((resolve, reject) => {
                userInfo()
                    .then(({ code, data }) => {
                        if (code === 200) {
                            if (!data) {
                                reject(new Error('验证失败，请重新登录'))
                            }
                            const {
                                roles,
                                name,
                                avatar,
                                introduction,
                                accesses
                            } = data
                            if (!roles) {
                                reject(new Error('roles不能为空'))
                            }
                            this.roles = roles
                            this.accesses = accesses
                            this.name = name
                            this.avatar = avatar
                            this.introduction = introduction
                            resolve(data)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        resetToken() {
            return new Promise((resolve) => {
                this.token = ''
                this.roles = []
                this.menus = []
                removeToken()
                resolve()
            })
        }
    }
})

export default useUser
