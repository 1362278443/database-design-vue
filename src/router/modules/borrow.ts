// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const borrowRoutes: Array<RouteRecordRaw> = [
  {
    //借阅管理
    path: '/br',
    component: () => import('@/layout/index.vue'),
    meta: { title: '借阅管理' },
    children: [
      {
        path: 'borrow',
        component: () => import('@/views/borrow/index.vue'),
        meta: { title: '借书' },
      },
      {
        path: 'return',
        component: () => import('@/views/return/index.vue'),
        meta: { title: '还书' },
      },
    ],
  },
]

export default borrowRoutes
