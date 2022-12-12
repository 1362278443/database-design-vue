// crud.js
import * as api from './api'
import { dict } from '@fast-crud/fast-crud'
import _ from 'lodash'

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
        radio: {
          title: '状态', //字段名称
          search: { show: true }, // 搜索配置
          type: 'dict-radio', // 字段类型
          dict: dict({
            //数据字典配置
            url: '/dicts/OpenStatusEnum',
          }),
        },
        text: {
          title: '测试',
          search: { show: true },
          type: 'text',
        },
        // 你可以尝试在此处增加更多字段
      },
      // 其他crud配置
    },
  }
}
