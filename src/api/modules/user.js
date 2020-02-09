import axios from '../axios'

// 添加
export const addUser = (data) => {
  return axios({
    url: 'user/addUser',
    method: 'post',
    data
  })
}

// 保存
export const save = (data) => {
  return axios({
    url: 'user/save',
    method: 'post',
    data
  })
}
// 禁用该用户
export const banUserById = (data) => {
  return axios({
    url: 'user/:uId/state/:type',
    method: 'put',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: 'user/delete',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (data) => {
  return axios({
    url: 'user/findPage',
    method: 'post',
    data
  })
}
