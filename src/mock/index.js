import Mock from 'mockjs'

// 模拟登录接口
Mock.mock('/user/login', 'post', function (option) {
  console.log(option)
  return {
    username: 'kangyuxin',
    msg: 'success',
    code: 200,
    token: 'kyx_is_handsome'
  }
})

// 模拟登出接口
Mock.mock('/user/logout', 'get', function (option) {
  console.log(option)
  return {
    msg: '',
    code: 200
  }
})
