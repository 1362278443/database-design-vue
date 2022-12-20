// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const commonRoutes: Array<RouteRecordRaw> = [
  {
    //首页

    name: 'framework',
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    meta: { title: '图书管理系统', icon: 'House' },
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页',
          icon: 'House',
        },
      },
    ],
  },
]

export default commonRoutes
