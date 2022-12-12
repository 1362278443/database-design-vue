import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import router from '@/router/index'
import plugin from './plugin'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(plugin)
app.mount('#app')
