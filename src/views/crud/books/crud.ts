// crud.js
import * as api from './api'

// 构建crudOptions的方法
export default function ({ expose }) {
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
      columns: {
        // 字段配置
        id: {
          title: '编号', //字段名称
          search: { show: true }, // 搜索配置
          type: 'number', // 字段类型
        },
        name: {
          title: '书名',
          search: { show: true },
          type: 'text',
        },
        time: {
          title: '出版日期',
          type: 'date',
          search: {
            show: true,
            component: {
              name: 'el-date-picker',
              type: 'year',
            },
          },
        },
        pub: {
          title: '出版社',
          search: { show: true },
          type: 'text',
        },
        locate: {
          title: '位置',
          search: { show: true },
          type: 'text',
        },
      },
    },
  }
}
