// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const borrowRoutes: Array<RouteRecordRaw> = [
  {
    //借阅管理
    path: '/br',
    redirect: '/info',
    component: () => import('@/layout/index.vue'),
    meta: { title: '借阅管理' },
    children: [
      {
        name: 'info',
        path: 'borrow',
        component: () => import('@/views/crud/borrow/index.vue'),
        meta: { title: '借书' },
      },
      {
        name: 'info',
        path: 'return',
        component: () => import('@/views/crud/return/index.vue'),
        meta: { title: '还书' },
      },
    ],
  },
]

export default borrowRoutes
