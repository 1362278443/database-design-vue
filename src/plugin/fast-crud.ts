import { request } from '@/api/service'
import { FastCrud } from '@fast-crud/fast-crud'
import '@fast-crud/fast-crud/dist/style.css'
import UiElement from '@fast-crud/ui-element'

function install(app) {
  app.use(UiElement)
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
        table: {
          size: 'default',
          pagination: false,
        },
        rowHandle: {
          buttons: {
            view: { text: null, icon: 'ion:eye-outline', size: 'default' },
            edit: { text: null, icon: 'ion:create-outline', size: 'default' },
            remove: {
              type: 'danger',
              text: null,
              icon: 'ion:trash-outline',
              size: 'default',
            },
          },
          dropdown: {
            more: {
              size: 'default',
            },
          },
        },
        request: {
          // 查询参数转换
          transformQuery: ({ page, form, sort }) => {
            const limit = page.pageSize
            const currentPage = page.currentPage ?? 1
            const offset = limit * (currentPage - 1)

            sort = sort == null ? {} : sort

            return {
              page: {
                limit,
                offset,
              },
              query: form,
              sort,
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
