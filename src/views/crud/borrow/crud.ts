// crud.js
import * as api from './api'
import { ref } from 'vue'

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
      rowHandle: {
        buttons: {
          view: { show: true },
          edit: { text: false },
          remove: {
            type: 'primary',
            title: '归还',
            icon: 'Plus',
          },
        },
      },
      table: {
        rowKey: 'id', //设置你的主键id， 默认rowKey=id
        onSelectionChange,
        remove: {
          async confirmFn(context) {
            await ElMessageBox.confirm(`确定归还此书吗?`)
          },
        },
      },
      search: {
        autoSearch: false,
        validate: true,
      },
      actionbar: {
        buttons: {
          add: {
            text: '借书',
            icon: 'Plus',
          },
        },
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
        sno: {
          title: '借书证号',
          key: 'id',
          type: 'text',
          search: {
            show: true,
            rules: [
              { pattern: /^[0-9]+$/, message: '输入必须为数字' },
              { len: 10, message: '长度需为10位' },
            ],
          },
          column: { show: false },
          form: { show: false },
        },
        id: {
          title: 'ID',
          key: 'id',
          type: 'number',
          column: { width: 80 },
          form: { show: true },
        },
        name: {
          title: '书名',
          type: 'text',
          addForm: { show: false },
        },
        borrow_time: {
          title: '借书时间',
          type: 'datetime',
          addForm: { show: false },
        },
        time: {
          title: '出版日期',
          type: 'date',
          addForm: { show: false },
          column: { show: false },
        },
        pub: {
          title: '出版社',
          type: 'text',
          addForm: { show: false },
          column: { show: false },
        },
        locate: {
          title: '位置',
          type: 'text',
          addForm: { show: false },
          column: { show: false },
        },
      },
    },
  }
}
