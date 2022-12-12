// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const commonRoutes: Array<RouteRecordRaw> = [
  //首页
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'home',
      icon: '',
    },
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/crud/test/index.vue'),
  },
]

export default commonRoutes
