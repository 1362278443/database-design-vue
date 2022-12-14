import FastCrud from './fast-crud'

function install(app) {
  app.use(FastCrud)
}

export default {
  install,
}
