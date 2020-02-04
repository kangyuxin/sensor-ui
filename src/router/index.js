import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../views/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard'),
          meta: { title: '系统首页' }
        },
        {
          path: '/table',
          component: () => import(/* webpackChunkName: "table" */ '../views/BaseTable'),
          meta: { title: '基础表格' }
        },
        {
          // 图片上传组件
          path: '/upload',
          component: () => import(/* webpackChunkName: "upload" */ '../views/Upload'),
          meta: { title: '文件上传' }
        },
        {
          // 国际化组件
          path: '/i18n',
          component: () => import(/* webpackChunkName: "i18n" */ '../views/I18n'),
          meta: { title: '国际化' }
        },
        {
          // 权限页面
          path: '/permission',
          component: () => import(/* webpackChunkName: "permission" */ '../views/Permission'),
          meta: { title: '权限测试', permission: true }
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ '../views/error/404'),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: () => import(/* webpackChunkName: "403" */ '../views/error/403'),
          meta: { title: '403' }
        }
      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
      meta: { title: '登录' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
