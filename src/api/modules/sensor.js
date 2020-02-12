// 分页查询
import axios from '../axios'

export const findPage = (data) => {
  return axios({
    url: 'sensor/findPage',
    method: 'post',
    data
  })
}
