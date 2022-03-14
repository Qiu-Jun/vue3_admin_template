import service from '@/lib/servic'

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
        url: '/mock_api/user/userinfo'
    })
}

export function us() {}
