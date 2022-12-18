// crud.js
import * as api from './api'
import { ref } from 'vue'
import studentStore from '@/store/modules/student'

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
    return await api.DelObj(row.sn)
  }
  const addRequest = async ({ form, row }) => {
    return await api.AddObj(form)
  }
  const selectedIds = ref([])
  const selectedtime = ref([])

  const onSelectionChange = (changed) => {
    console.log('selection', changed)
    selectedIds.value = changed.map((item) => item.sn)
    selectedtime.value = changed.map((item) => item.borrow_time)
  }

  const store = studentStore()

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
    if (
      now.getTime() - row.borrow_time >
      1000 * 60 * 60 * 24 * store.limit_day
    ) {
      return 'warning-row'
    }
    return ''
  }

  return {
    selectedIds, //返回给index.vue去使用
    selectedtime,
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
        rowKey: 'SN', //设置你的主键id， 默认rowKey=id
        onSelectionChange,
        remove: {
          async confirmFn(context) {
            await ElMessageBox({
              title: '还书',
              message: '确定要归还此书吗',
              showCancelButton: true,
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  //判断当前书是否超期
                  const now = new Date()
                  //超期时间
                  const overTime =
                    now.getTime() -
                    context.row.borrow_time -
                    1000 * 60 * 60 * 24 * store.limit_day
                  if (overTime > 0) {
                    //计算费用
                    const fine = Math.ceil(overTime / (1000 * 60 * 60 * 24)) * 2
                    console.log('需缴费用' + fine)
                    ElMessageBox.confirm(
                      '此书超期了需要缴纳费用' + fine + '分',
                      '缴费',
                      {
                        confirmButtonText: '点击缴费',
                        cancelButtonText: '取消',
                      }
                    ).then((action) => {
                      if (action === 'confirm') done()
                    })
                  } else {
                    done()
                  }
                } else {
                  done()
                }
              },
            })
          },
          onRemoved: (context) => {
            //模拟缴费
            console.log('aaaa')
            const now = new Date()
            if (
              now.getTime() - context.row.borrow_time >
              1000 * 60 * 60 * 24 * store.limit_day
            ) {
              ElMessage.success('我是学生，倒贴50给我')
            }
            ElNotification({
              title: '成功',
              message: '还书成功',
              type: 'success',
            })
          },
          showSuccessNotification: false,
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
        SN: {
          title: '记录号',
          key: 'SN',
          type: 'text',
          search: {
            show: false,
          },
          column: { show: false, columnSetDisabled: true },
          form: { show: false },
        },
        sno: {
          title: '借书证号',
          key: 'sno',
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
          title: '图书编号',
          key: 'id',
          type: 'number',
          column: { width: 80 },
          form: { show: true },
        },
        name: {
          title: '书名',
          type: 'text',
          addForm: { show: false },
          form: { submit: false },
        },
        pub: {
          title: '出版社',
          type: 'text',
          addForm: { show: false },
          column: { show: true },
          form: { submit: false },
        },
        borrow_time: {
          title: '借书时间',
          type: 'datetime',
          addForm: { show: false },
          form: { submit: false },
        },
        time: {
          title: '出版日期',
          type: 'date',
          addForm: { show: false },
          column: { show: false, columnSetDisabled: true },
          form: { submit: false },
        },
        locate: {
          title: '位置',
          type: 'text',
          addForm: { show: false },
          column: { show: false, columnSetDisabled: true },
          form: { submit: false },
        },
      },
    },
  }
}
