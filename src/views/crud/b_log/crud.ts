// crud.js
import * as api from './api'
import { CrudExpose } from '@fast-crud/fast-crud'
import { utils } from '@fast-crud/fast-crud'
import dayjs from 'dayjs'

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
        rowKey: 'SN', //设置你的主键id， 默认rowKey=id
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
        sn: {
          title: '序号',
          key: 'SN',
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
        id: {
          title: '图书编号',
          type: 'number',
          search: { show: true },
          column: {
            width: 110,
            sortable: 'custom',
          },
        },
        bookname: {
          title: '书名',
          type: 'text',
          column: {
            show: false,
          },
        },
        time: {
          title: '出版日期',
          type: 'data',
          column: {
            show: false,
          },
        },
        pub: {
          title: '出版社',
          type: 'text',
          column: {
            show: false,
          },
        },
        locate: {
          title: '位置',
          type: 'text',
          column: {
            show: false,
          },
        },
        sno: {
          title: '借书证号',
          type: 'text',
          search: { show: true },
          column: {
            sortable: 'custom',
          },
        },
        stuname: {
          title: '借书人名',
          type: 'text',
          column: {
            show: false,
          },
        },
        dep: {
          title: '系别',
          type: 'text',
          column: {
            show: false,
          },
        },
        pro: {
          title: '专业',
          type: 'text',
          column: {
            show: false,
          },
        },
        datetimerange: {
          title: '借阅时间',
          type: 'datetimerange',
          search: { show: true, width: 300 },
          valueBuilder({ row, key }) {
            if (row.borrow_time && row.return_time) {
              row[key] = [dayjs(row.borrow_time), dayjs(row.return_time)]
            }
          },
          valueResolve({ form, key }) {
            const row = form
            if (row[key] != null && !utils.strings.hasEmpty(row[key])) {
              row.borrow_time = row[key][0]
              row.return_time = row[key][1]
            }
          },
          form: {
            display: 'flex',
            col: { span: 24 },
          },
        },
        fine: {
          title: '缴纳罚金(分)',
          type: 'number',
          column: {
            sortable: 'custom',
          },
          form: {
            display: 'flex',
          },
        },
      },
      form: {
        group: {
          type: 'collapse',
          accordion: false, //手风琴模式
          groups: {
            book: {
              title: '书籍信息',
              columns: ['id', 'bookname', 'time', 'pub', 'locate'],
            },
            stu: {
              title: '借书人信息',
              columns: ['sno', 'stuname', 'dep', 'pro'],
            },
            info: {
              title: '借阅信息',
              columns: ['datetimerange', 'fine'],
            },
          },
        },
      },
    },
  }
}
