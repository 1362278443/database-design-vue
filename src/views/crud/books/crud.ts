// crud.js
import * as api from './api'
import { ref } from 'vue'
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
  const selectedIds = ref([])

  const onSelectionChange = (changed) => {
    console.log('selection', changed)
    selectedIds.value = changed.map((item) => item.id)
  }
  return {
    selectedIds, //返回给index.vue去使用
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
        onSelectionChange,
      },
      columns: {
        // 字段配置
        // 选择列
        $checked: {
          title: '选择',
          form: { show: false },
          column: {
            type: 'selection',
            align: 'center',
            width: '55px',
            columnSetDisabled: true, //禁止在列设置中选择
          },
        },
        id: {
          title: '编号',
          key: 'id',
          type: 'number',
          search: { show: true },
          column: {
            width: 80,
            sortable: 'custom',
          },
          form: {
            show: false,
          },
        },
        name: {
          title: '书名',
          type: 'text',
          search: { show: true },
          form: {
            rules: [{ required: true }],
          },
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
          form: {
            rules: [{ required: true }],
          },
          column: {
            sortable: 'custom',
          },
        },
        pub: {
          title: '出版社',
          type: 'text',
          search: { show: true },
          form: {
            rules: [{ required: true }],
          },
        },
        locate: {
          title: '位置',
          type: 'text',
          search: { show: true },
          form: {
            rules: [{ required: true }],
          },
        },
      },
    },
  }
}
