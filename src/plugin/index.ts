import FastCrud from './fast-crud'

function install(app: {
  use: (arg0: { install: (app: any) => void }) => void
}) {
  app.use(FastCrud)
}

export default {
  install,
}
