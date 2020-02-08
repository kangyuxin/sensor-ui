import axios from '../axios'

// 保存
export const save = (params) => {
  return axios({
    url: 'user/save',
    method: 'post',
    params
  })
}// 删除
export const del = (params) => {
  return axios({
    url: 'user/delete',
    method: 'post',
    params
  })
}
// 分页查询
export const findPage = (params) => {
  return axios({
    url: 'user/findPage',
    method: 'post',
    params
  })
}

export function getUserList (parameter) {
  return axios({
    url: 'user/getUserList',
    method: 'get',
    params: parameter
  })
}
