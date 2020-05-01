import axios from 'axios'

//request-interceptor
axios.interceptors.request.use(
    config => {
        //获取储存在本地的token值
        let token = window.sessionStorage.getItem('token')
        //这边可根据自己的需求设置headers
        if (token !== null) {
            config.headers.Token = token
        } else {
            config.headers.Token = ''
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// respone-interceptor
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default axios