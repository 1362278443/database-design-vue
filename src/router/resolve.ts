import exceptionRoutes from './error'
import commonRoutes from './common'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [...exceptionRoutes, ...commonRoutes]
export { routes }
