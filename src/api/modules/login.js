import axios from '../axios'

// 登录
export const login = data => {
  return axios({
    url: 'other/login.action',
    method: 'post',
    data
  })
}

// 登出
export const logout = () => {
  return axios({
    url: 'logout',
    method: 'get'
  })
}
