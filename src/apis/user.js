/*
 * :Author: June
 * :Date: 2022-03-07 02:12:16
 * :LastEditTime: 2022-03-30 02:01:46
 * :Description:
 */
import service from '@/lib/servic'
import { getToken } from '@/utils/auth'

export function userLogin(data) {
    return service({
        url: '/mock_api/user/login',
        method: 'post',
        data
    })
}

export function userLogout() {}

export function userInfo() {
    return service({
        url: `/mock_api/user/userinfo?token=${getToken()}`
    })
}

export function us() {}
