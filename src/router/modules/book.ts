// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const bookRoutes: Array<RouteRecordRaw> = [
  {
    //图书管理
    path: '/book',
    redirect: '/info',
    component: () => import('@/layout/index.vue'),
    meta: { title: '书籍管理' },
    children: [
      {
        name: 'info',
        path: 'info',
        component: () => import('@/views/crud/books/index.vue'),
        meta: { title: '书籍管理' },
      },
    ],
  },
]

export default bookRoutes
