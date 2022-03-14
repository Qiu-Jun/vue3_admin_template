import { userLogin, userInfo } from '@/apis/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router/index'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: [],
    accesses: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_MENUS: (state, menus) => {
        state.menus = menus
    },
    SET_ACCESSES: (state, accesses) => {
        state.accesses = accesses
    }
}

const actions = {
    login({ commit }, userData) {
        const { username, password } = userData
        return new Promise((resolve, reject) => {
            userLogin({ username: username.trim(), password })
                .then(({ code, data }) => {
                    if (code === 200) {
                        commit('SET_TOKEN', data.token)
                        setToken(data.token)
                        resolve()
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    getUserInfo({ commit }) {
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
                            menus,
                            accesses
                        } = data
                        if (!roles) {
                            reject(new Error('roles不能为空'))
                        }

                        commit('SET_ROLES', roles)
                        commit('SET_ACCESSES', accesses)
                        commit('SET_MENUS', menus)
                        commit('SET_NAME', name)
                        commit('SET_AVATAR', avatar)
                        commit('SET_INTRODUCTION', introduction)
                        resolve(data)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    resetToken({ commit }) {
        return new Promise((resolve) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_MENUS', [])
            removeToken()
            resolve()
        })
    },

    async changeRoles({ commit, dispatch }, role) {
        const token = `${role}-token`

        commit('SET_TOKEN', token)
        setToken(token)

        const { roles } = await dispatch('getInfo')

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch(
            'permission/generateRoutes',
            roles,
            { root: true }
        )
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
