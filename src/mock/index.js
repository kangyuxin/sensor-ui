import Mock from 'mockjs'

// 模拟登录接口
Mock.mock('http://localhost:8088/other/login.action', 'post', function (option) {
  console.log(option)
  return {
    username: 'kangyuxin',
    msg: 'success',
    code: 200,
    token: 'kyx_is_handsome'
  }
})
