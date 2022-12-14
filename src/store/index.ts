import { createPinia, Pinia } from 'pinia'
const store = createPinia()
export default {
  install(app: { use: (arg0: Pinia) => void }) {
    app.use(store)
  },
}

export { store }
