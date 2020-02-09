/*
 * 用户管理模块
 */

// 保存
export function save () {
  return {
    url: 'user/save',
    type: 'post',
    data: {
      'code': 200,
      'msg': null,
      'data': 1
    }
  }
}
// 批量删除
export function batchDelete () {
  return {
    url: 'user/delete',
    type: 'post',
    data: {
      'code': 200,
      'msg': null,
      'data': 1
    }
  }
}
// 分页查询
export function findPage (params) {
  let findPageData = {
    'code': 200,
    'msg': 'success',
    'data': {}
  }
  let pageIndex = 1
  let pageSize = 5
  if (params !== null) {
    // pageIndex = params.pageIndex
  }
  if (params !== null) {
    // pageSize = params.pageSize
  }
  let content = this.getContent(pageIndex, pageSize)
  findPageData.data.pageIndex = pageIndex
  findPageData.data.pageSize = pageSize
  findPageData.data.totalSize = 50
  findPageData.data.content = content
  return {
    url: 'user/findPage',
    type: 'post',
    data: findPageData
  }
}
export function getContent (pageIndex, pageSize) {
  let content = []
  for (let i = 0; i < 5; i++) {
    let obj = {}
    let index = ((pageIndex - 1) * pageSize) + i + 1
    obj.id = index
    obj.username = 'admin' + index
    obj.password = 'admin'
    obj.salt = 'kyx_is_handsome'
    obj.email = 'kangyuxin' + index + '@qq.com'
    obj.mobile = '17850085595'
    obj.mg_state = true
    obj.status = 1
    obj.createBy = 'admin'
    obj.createTime = '2020-02-14 11:11:11'
    obj.createBy = 'admin'
    obj.createTime = '2020-02-14 12:12:12'
    content.push(obj)
  }
  return content
}
