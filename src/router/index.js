import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
          path: '/introduce',
          component: () => import(/* webpackChunkName: "introduce" */ '../views/intro/Introduce'),
          meta: { title: '系统介绍' }
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
      component: () => import(/* webpackChunkName: "user" */ '../views/Login'),
      meta: { title: '登录' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  const token = window.sessionStorage.getItem('token')
  // let username = sessionStorage.getItem('user')
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
    if (!token) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router
