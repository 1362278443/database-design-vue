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

  interface rowItem {
    id: number
    name: string
    pub: string
    borrow_time: number
    limit_day: number
  }

  //超期的行标红
  const tableRowClassName = ({ row }: { row: rowItem }) => {
    const now = new Date()
    if (now.getTime() - row.borrow_time > 1000 * 60 * 60 * 24 * row.limit_day) {
      return 'warning-row'
    }
    return ''
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
          edit: { show: false },
          remove: {
            type: 'primary',
            title: '归还',
            icon: 'Finished',
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
        rowClassName: tableRowClassName,
        stripe: false,
      },
      search: {
        autoSearch: false,
        //取消自动查询
        validate: true,
        //取消初始化查询
        searchAfterReset: false,
        buttons: {
          search: {
            show: false,
          },
          reset: {
            show: false,
          },
        },
      },
      actionbar: {
        buttons: { add: { show: false } },
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
              { required: true, message: '请输入借书证号' },
              { pattern: /^[0-9]+$/, message: '输入必须为数字' },
              { len: 10, message: '长度需为10位' },
            ],
          },
          column: { show: false, columnSetDisabled: true },
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
        pub: {
          title: '出版社',
          type: 'text',
          addForm: { show: false },
          column: { show: true },
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
          column: { show: false, columnSetDisabled: true },
        },
        locate: {
          title: '位置',
          type: 'text',
          addForm: { show: false },
          column: { show: false, columnSetDisabled: true },
        },
      },
    },
  }
}
