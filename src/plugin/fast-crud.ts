import { request } from '@/api/service'
import ui from '@fast-crud/ui-element'
import { FastCrud } from '@fast-crud/fast-crud'
import '@fast-crud/fast-crud/dist/style.css'

function install(app) {
  app.use(ui)
  app.use(FastCrud, {
    async dictRequest({ url }) {
      return await request({ url, method: 'post' })
    },
    /**
     * useCrud时会被执行
     * @param context，useCrud的参数
     */
    commonOptions(context: any = {}) {
      const opts = {
        //设置为卡片布局
        container: {
          is: 'fs-layout-card',
        },
        table: {
          size: 'default',
          pagination: false,
        },
        //工具栏设置
        toolbar: {
          buttons: {
            compact: { show: false },
          },
        },
        rowHandle: {
          buttons: {
            view: { show: false, text: null, icon: 'View', size: 'default' },
            edit: { text: null, icon: 'Edit', size: 'default' },
            remove: {
              type: 'danger',
              text: null,
              icon: 'Delete',
              size: 'default',
            },
          },
          dropdown: {
            more: {
              size: 'default',
            },
          },
          width: 125,
        },
        request: {
          // 查询参数转换
          transformQuery: ({ page, form, sort }) => {
            const limit = page.pageSize
            const currentPage = page.currentPage ?? 1
            const offset = limit * (currentPage - 1)

            const order =
              sort == null ? {} : { orderProp: sort.prop, orderAsc: sort.asc }

            return {
              page: {
                limit,
                offset,
              },
              query: form,
              order,
            }
          },
          // page请求结果转换
          transformRes: ({ res }) => {
            const pageSize = res.limit
            let currentPage = res.offset / pageSize
            if (res.offset % pageSize === 0) {
              currentPage++
            }
            return { currentPage, pageSize, ...res }
          },
        },
        form: {
          display: 'flex', //表单布局
          labelWidth: '100px', //表单label宽度
        },
      }
      return opts
    },
  })
}

export default {
  install,
}
