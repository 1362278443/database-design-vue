// crud.js
import * as api from './api'
import { CrudExpose } from '@fast-crud/fast-crud'

// 构建crudOptions的方法
export default function ({ crudExpose }: { crudExpose: CrudExpose }) {
  const pageRequest = async (query) => {
    return await api.GetList(query)
  }
  const editRequest = async ({ form, row }) => {
    form.id = row.id
    return await api.UpdateObj(form)
  }
  const delRequest = async ({ row }) => {
    return await api.DelObj(row.id)
  }
  const addRequest = async ({ form }) => {
    return await api.AddObj(form)
  }

  return {
    crudOptions: {
      //请求配置
      request: {
        pageRequest, // 列表数据请求
        addRequest, // 添加请求
        editRequest, // 修改请求
        delRequest, // 删除请求
      },
      table: {
        rowKey: 'id', //设置你的主键id， 默认rowKey=id
      },
      actionbar: {
        buttons: {
          add: {
            show: false,
          },
        },
      },
      rowHandle: {
        buttons: {
          view: {
            show: true,
          },
          edit: {
            show: false,
          },
          remove: {
            show: false,
          },
        },
        width: 80,
      },
      columns: {
        // 字段配置
        // 选择列
        name: {
          title: '书名',
          type: 'text',
          search: { show: true },
        },
        time: {
          title: '出版日期',
          type: 'date',
          search: {
            show: true,
            component: {
              name: 'el-date-picker',
              type: 'year',
              'value-format': 'YYYY',
            },
          },
          column: {
            sortable: 'custom',
          },
        },
        pub: {
          title: '出版社',
          type: 'text',
          search: { show: true },
        },
        allBorrow: {
          title: '累计借出量',
          type: 'nubmer',
          search: { show: false },
          column: {
            sortable: 'custom',
          },
        },
        inventory: {
          title: '借出情况',
          type: 'number',
          search: { show: false },
        },
        nowBorrow: {
          title: '借出量',
          type: 'number',
          column: { show: false },
          search: { show: false },
        },
      },
    },
  }
}
