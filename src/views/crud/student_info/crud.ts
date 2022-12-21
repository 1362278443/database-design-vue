// crud.js
import * as api from './api'

// 构建crudOptions的方法
export default function ({ crudExpose }) {
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
                  if (res != null) {
                    callback(new Error('借书证号重复'))
                  }
                  callback()
                },
                message: '借书证号重复',
              },
            ],
          },
          editForm: {
            show: false,
          },
          column: {
            sortable: 'custom',
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
        borrow_times: {
          title: '累计借书量',
          type: 'nubmer',
          search: { show: false },
          column: {
            sortable: 'custom',
          },
        },
        borrow_info: {
          title: '借书情况',
          search: { show: false },
          component: {
            name: 'el-progress',
          },
        },
      },
    },
  }
}
