import axios from '@/utils/request'

/**
 * @description 获取应用列表
 * @name login
 * @param params {name,password}
 */

const login = params => {
  return axios.post(`/login`, params)
}

const Api = {
  login
}

export default Api
