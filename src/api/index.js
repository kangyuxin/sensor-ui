import http from './interface'

const install = Vue => {
  if (install.installed) { return }

  install.installed = true

  Object.defineProperties(Vue.prototype, {
    // 注意，此处挂载在 Vue 原型的 $api 对象上
    $http: {
      get () {
        return http
      }
    }
  })
}

export default install
