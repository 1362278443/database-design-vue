// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const studentRoutes: Array<RouteRecordRaw> = [
  {
    //学生管理
    path: '/student',
    component: () => import('@/layout/index.vue'),
    meta: { title: '学生管理' },
    children: [
      {
        path: '',
        component: () => import('@/views/crud/students/index.vue'),
        meta: { title: '学生管理' },
      },
    ],
  },
]

export default studentRoutes
