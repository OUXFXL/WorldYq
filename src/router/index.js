import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '疫情地图', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/nowyq',
  //   component: Layout,
  //   // redirect: '/nowyq/index',
  //   children: [{
  //     path: 'nowyq',
  //     name: 'Nowyq',
  //     component: () => import('@/views/nowyq/index'),
  //     meta: { title: '实时疫情', icon: 'dashboard' }
  //   }]
  // },

  {
    path: '/nowyq',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'nowyq',
        component: () => import('@/views/nowyq/index'),
        meta: { title: '实时疫情', icon: 'form' }
      }
    ]
  },
  {
    path: '/YQTJ',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'YQTJ',
        component: () => import('@/views/YQTJ/index'),
        meta: { title: '数据统计', icon: 'tree' }
      }
    ]
  },

  {
    path: '/dingdian',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'dingdian',
        component: () => import('@/views/dingdian/index'),
        meta: { title: '定点医院', icon: 'tree' }
      }
    ]
  },

  {
    hidden: true,
    path: '/toDetail',
    component: Layout,
    children: [
      {
        path: 'details',
        name: 'toDetail',
        component: () => import('@/views/dingdian/toDetail/details'),
        meta: { title: '地图详情', icon: 'tree' }
      }
    ]
  },

  {
    path: '/set',
    component: Layout,
    redirect: '/set/Set',
    name: 'Set',
    meta: { title: '基础配置', icon: 'example' },
    children: [
      {
        path: 'Set',
        name: 'BuyList',
        component: () => import('@/views/set/Set'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/set/user'),
        meta: { title: '角色管理', icon: 'file-common' }
      },
      {
        path: 'QuanxSet',
        name: 'GoodsRequst',
        component: () => import('@/views/set/QuanxSet'),
        meta: { title: '权限设置', icon: 'tree' }
      },

    ]
  },

  {
    path: '/YQgl',
    component: Layout,
    redirect: '/YQgl/didian',
    name: 'GoodsTotal',
    meta: { title: '疫情管理', icon: 'example' },
    children: [
      {
        path: 'didian',
        name: 'Borrow',
        component: () => import('@/views/YQgl/didian'),
        meta: { title: '定点医院', icon: 'table' }
      },
      {
        path: 'zixufl',
        name: 'Recipients',
        component: () => import('@/views/YQgl/zixufl'),
        meta: { title: '资讯分类', icon: 'tree' }
      },

      {
        path: 'xwzixu',
        name: 'Recipients',
        component: () => import('@/views/YQgl/xwzixu'),
        meta: { title: '新闻资讯', icon: 'tree' }
      }

    ]
  },

  {
    path: '/YQsj',
    component: Layout,
    redirect: '/YQsj/shlist',
    name: 'GoodsTotal',
    meta: { title: '疫情数据', icon: 'example' },
    children: [
      {
        path: 'shlist',
        name: 'Borrow',
        component: () => import('@/views/YQsj/shlist'),
        meta: { title: '数据列表', icon: 'table' }
      },
      {
        path: 'sjsb',
        name: 'Recipients',
        component: () => import('@/views/YQsj/sjsb'),
        meta: { title: '上报数据', icon: 'tree' }
      },

    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
