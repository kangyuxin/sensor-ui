// 登录接口

export function login () {
  const loginData = {
    'status': 200,
    'msg': 'success',
    'data': {
      'id': null,
      'userId': 1,
      'token': 'kyx_is_handsome',
      'expireTime': '2020-02-10T16:24:50.473+0000',
      'createBy': null,
      'createTime': null,
      'lastUpdateBy': null,
      'lastUpdateTime': '2020-02-10T04:24:50.473+0000'
    }
  }
  return {
    url: 'other/login.action',
    type: 'post',
    data: loginData
  }
}
// 登出接口
export function logout () {
  const logoutData = {
    'status': 200,
    'msg': null,
    'data': {
    }
  }
  return {
    url: 'logout',
    type: 'get',
    data: logoutData
  }
}
