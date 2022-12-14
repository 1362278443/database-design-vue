// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const commonRoutes: Array<RouteRecordRaw> = [
  {
    //首页

    name: 'framework',
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    meta: { title: '图书管理系统' },
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/info/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
]

export default commonRoutes
