<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"/>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                <i :class="subItem.icon"/>{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"/>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../../components/bus'
export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-s-home',
          index: 'dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-switch-button',
          index: '1',
          title: '系统相关',
          subs: [
            {
              icon: 'el-icon-location-information',
              index: 'introduce',
              title: '系统介绍'
            },
            {
              icon: 'el-icon-view',
              index: 'monitor',
              title: '系统监控'
            }
          ]
        },
        {
          icon: 'el-icon-user',
          index: '2',
          title: '用户相关',
          subs: [
            {
              icon: 'el-icon-add-location',
              index: 'userList',
              title: '用户管理'
            }
          ]
        },
        {
          icon: 'el-icon-cpu',
          index: 'sensorList',
          title: '传感器'
        },
        {
          icon: 'el-icon-s-order',
          index: '4',
          title: '表单相关',
          subs: [
            {
              icon: 'el-icon-folder-add',
              index: 'upload',
              title: '文件上传'
            },
            {
              icon: 'el-icon-menu',
              index: 'table',
              title: '基础表格'
            }
          ]
        },
        {
          icon: 'el-icon-s-help',
          index: 'i18n',
          title: '国际化功能'
        },
        {
          icon: 'el-icon-info',
          index: '5',
          title: '错误处理',
          subs: [
            {
              icon: 'el-icon-loading',
              index: 'permission',
              title: '权限测试'
            },
            {
              icon: 'el-icon-loading',
              index: '404',
              title: '404页面'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  }
}
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar {
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
  .sidebar > ul {
    height: 100%;
  }
</style>
