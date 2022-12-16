import { createApp } from 'vue'
import './style.scss'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import router from '@/router/index'
import store from './store'
import plugin from './plugin'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus, { size: 'default', zIndex: 3000, locale: zhCn })
app.use(router)
app.use(store)
app.use(plugin)
app.mount('#app')
