import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://192.168.3.200:2611',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (config.url !== '/login') {
      config.headers['Authorization'] = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      if (res.code) {
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 8) {
          // 过期
          sessionStorage.clear()
          router.push({ path: '/' })
          Message({
            message: 'token过期，请重新登录',
            type: 'error',
            duration: 5 * 1000
          })
        } else if (res.code === 9) {
          Message({
            message: 'token错误，请重新登录',
            type: 'error',
            duration: 5 * 1000
          })
          // 过期
          sessionStorage.clear()
          router.push({ path: '/' })
        }
      }
      return Promise.reject(new Error(res.code || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
