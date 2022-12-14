import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router/index'
import store from './store'
import plugin from './plugin'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus, { size: 'small' })
app.use(router)
app.use(store)
app.use(plugin)
app.mount('#app')
