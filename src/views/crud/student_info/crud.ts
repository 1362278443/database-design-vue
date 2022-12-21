// crud.js
import * as api from './api'
import { CrudExpose, compute } from '@fast-crud/fast-crud'

// 构建crudOptions的方法
export default function ({ crudExpose }: { crudExpose: CrudExpose }) {
  const pageRequest = async (query) => {
    return await api.GetList(query)
  }
  const editRequest = async ({ form, row }) => {
    form.sno = row.sno
    return await api.UpdateObj(form)
  }
  const delRequest = async ({ row }) => {
    return await api.DelObj(row.sno)
  }
  const addRequest = async ({ form }) => {
    return await api.AddObj(form)
  }
  const colors = [
    { color: '#67C23A', percentage: 60 },
    { color: '#E6A23C', percentage: 80 },
    { color: '#F56C6C', percentage: 100 },
  ]

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
        rowKey: 'sno', //设置你的主键id， 默认rowKey=id
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
        sno: {
          title: '借书证号',
          key: 'sno',
          type: 'text',
          search: {
            show: true,
          },
          column: {
            sortable: 'custom',
          },
        },
        name: {
          title: '姓名',
          type: 'text',
          search: { show: true },
        },
        dep: {
          title: '系别',
          type: 'text',
          search: { show: true },
        },
        pro: {
          title: '专业',
          type: 'text',
          search: { show: true },
        },
        sumnum: {
          title: '累计借书量',
          type: 'nubmer',
          search: { show: false },
          column: {
            sortable: 'custom',
          },
        },
        num: {
          title: '借书情况',
          type: 'nubmer',
          search: { show: false },
          viewForm: {
            component: {
              name: 'el-progress',
              strokeWidth: 10,
              color: colors,
              percentage: compute((context: any) => {
                return (context.row.num / 5) * 100
              }),
              slots: {
                default(context: any) {
                  return context.row.num + '/5'
                },
              },
            },
          },
        },
      },
    },
  }
}
