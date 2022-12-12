import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import { routes } from './resolve'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

/**
 * 路由拦截
 */
router.beforeEach((to, from) => {
  console.log('全局路由前置守卫：to,from\n', to, from)
  // 设置页面标题
  document.title = to.meta.title as string
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
})

router.afterEach((to, from) => {
  console.log('全局路由后置守卫：to,from\n', to, from)
  NProgress.done()
})

export default router
