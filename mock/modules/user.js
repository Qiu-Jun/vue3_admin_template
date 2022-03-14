const tokens = {
    admin: 'admin-token',
    editor: 'editor-token'
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}
export default [
    {
        url: '/mock_api/user/login',
        type: 'post',
        response: (config) => {
            const { username } = config.body
            const token = tokens[username]
            if (!token) {
                return {
                    code: 101,
                    message: 'Account and password are incorrect.'
                }
            }
            return {
                code: 200,
                data: token
            }
        }
    },

    // get user info
    {
        url: '/mock_api/user/userinfo',
        type: 'get',
        response: (config) => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 500,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: info
            }
        }
    }
]
