// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const infoRoutes: Array<RouteRecordRaw> = [
  {
    //统计信息
    hideMenu: true,
    name: 'info',
    path: '/info',
    component: () => import('@/layout/index.vue'),
    redirect: '/',
    meta: { title: '统计信息' },
    children: [
      {
        name: 'book_info',
        path: 'book_info',
        component: () => import('@/views/crud/book_info/index.vue'),
        meta: {
          title: '书籍信息统计',
        },
      },
      {
        name: 'student_info',
        path: 'student_info',
        component: () => import('@/views/crud/student_info/index.vue'),
        meta: {
          title: '学生信息统计',
        },
      },
    ],
  },
]

export default infoRoutes
