import exceptionRoutes from './error'
import commonRoutes from './common'
import bookRoutes from './modules/book'
import studentRoutes from './modules/student'
import borrowRoutes from './modules/borrow'
import logRoutes from './modules/b_log'
import infoRoutes from './modules/info'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  ...exceptionRoutes,
  ...commonRoutes,
  ...bookRoutes,
  ...studentRoutes,
  ...borrowRoutes,
  ...logRoutes,
  ...infoRoutes,
]
export { routes }
