// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const logRoutes: Array<RouteRecordRaw> = [
  {
    //日志管理
    path: '/log',
    redirect: '/log/info',
    component: () => import('@/layout/index.vue'),
    meta: { title: '日志管理' },
    children: [
      {
        path: 'info',
        component: () => import('@/views/crud/b_log/index.vue'),
        meta: { title: '日志管理' },
      },
    ],
  },
]

export default logRoutes
