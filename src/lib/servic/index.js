import axios from 'axios'

const service = axios.create({
    baseURL: '/',
    withCredentials: true,
    timeout: 5000
})

service.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        const { status, data: resData } = response
        if (status !== 200) return Promise.reject(new Error('请求失败'))
        return new Promise((resolve, reject) => {
            const { code, data } = resData
            switch (code) {
                case 200:
                    resolve({
                        code,
                        data
                    })
                    break
                default:
                    reject(new Error('请求错误'))
                    break
            }
        })
    },
    (error) => {
        console.log(`err${error}`) // for debug

        return Promise.reject(error)
    }
)

export default service
