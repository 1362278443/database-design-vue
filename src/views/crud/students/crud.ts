// crud.js
import * as api from './api'
import { ref } from 'vue'

// 构建crudOptions的方法
export default function ({ expose }) {
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
  const selectedIds = ref([])

  const onSelectionChange = (changed) => {
    console.log('selection', changed)
    selectedIds.value = changed.map((item) => item.sno)
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
        rowKey: 'sno', //设置你的主键id， 默认rowKey=id
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
        sno: {
          title: '借书证号',
          key: 'sno',
          type: 'text',
          search: { show: true },
          addForm: {
            rules: [
              { required: true },
              { pattern: /^[0-9]+$/, message: '输入必须为数字' },
              { len: 10, message: '长度需为10位' },
              {
                //向后端请求判断是否有该学生
                async validator(rule: any, value: any, callback: any) {
                  const errors = []
                  const res = await api.GetObj(value)
                  if (Boolean(res) == true) {
                    callback(new Error('借书证号重复'))
                  }
                  callback()
                },
                message: '已有该借书证号的学生存在',
              },
            ],
          },
          editForm: {
            show: false,
          },
        },
        name: {
          title: '姓名',
          type: 'text',
          search: { show: true },
          form: {
            rules: [{ required: true }],
          },
        },
        dep: {
          title: '系别',
          type: 'text',
          search: { show: true },
          form: {
            rules: [{ required: true }],
          },
        },
        pro: {
          title: '专业',
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
