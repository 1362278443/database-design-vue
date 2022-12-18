<template>
  <fs-page class="page-layout-card">
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #search-right>
        <el-button icon="Search" type="primary" @click="Search">查询</el-button>
      </template>
      <template #header-bottom>
        <transition name="fade-scale">
          <el-card v-if="!isCollapse">
            <info
              :name="stuInfo.name"
              :dep="stuInfo.dep"
              :pro="stuInfo.pro"
            ></info>
          </el-card>
        </transition>
      </template>
      <template #actionbar-right>
        <el-button icon="Plus" type="primary" @click="openFormWrapper">
          借书
        </el-button>
        <fs-form-wrapper ref="formWrapperRef" />
      </template>
      <template #pagination-left>
        <el-tooltip content="批量还书">
          <fs-button icon="Finished" @click="handleBatchDelete"></fs-button>
        </el-tooltip>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import createCrudOptions from './crud'
import { useExpose, useCrud } from '@fast-crud/fast-crud'
import { BatchDelete, GetObj } from './api'
import Schema from 'async-validator'
import info from './info.vue'
import { errorCreate } from '@/api/tools'
import studentStore from '@/store/modules/student'
import { ElNotification } from 'element-plus'

export default defineComponent({
  components: {
    info,
  },
  name: 'book', // 实际开发中可以修改一下name
  setup() {
    const formWrapperRef = ref()
    // crud组件的ref
    const crudRef = ref()
    // crud 配置的ref
    const crudBinding = ref()
    // 暴露的方法
    const { crudExpose } = useExpose({ crudRef, crudBinding })
    // 你的crud配置
    const { crudOptions, selectedIds, selectedtime } = createCrudOptions({
      crudExpose,
    })
    // 初始化crud配置
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { resetCrudOptions } = useCrud({ crudExpose, crudOptions })
    // 你可以调用此方法，重新初始化crud配置
    // resetCrudOptions(options)

    //判断是否有查出学生
    const isCollapse = ref(true)
    const stuInfo = ref()
    const store = studentStore()

    const handleBatchDelete = async () => {
      if (selectedIds.value?.length > 0) {
        await ElMessageBox({
          title: '还书',
          message: '确定要归这些此书吗',
          showCancelButton: true,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              //判断当前书是否超期。并计算费用
              const now = new Date()
              const fine = ref(0)
              selectedtime.value.forEach((element) => {
                const overTime =
                  now.getTime() -
                  element -
                  1000 * 60 * 60 * 24 * store.limit_day
                if (overTime > 0) {
                  fine.value += Math.ceil(overTime / (1000 * 60 * 60 * 24)) * 2
                }
              })
              console.log('需缴费用' + fine.value)
              if (fine.value > 0) {
                ElMessageBox.confirm(
                  '归还这些书需要缴纳费用' + fine.value + '分',
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
        await BatchDelete(selectedIds.value)
        ElNotification({
          title: '成功',
          message: '还书成功',
          type: 'success',
        })
        selectedIds.value = []
        await crudExpose.doRefresh()
      } else {
        ElMessage.error('请先勾选记录')
      }
    }

    //判断是否能借书
    function openFormWrapper() {
      const search = crudExpose.getSearchRef()
      console.log(crudExpose)
      if (isCollapse.value) {
        ElMessage.warning('请先输入借书证号！')
        return
      }
      //判断书是否超过借书上限
      if (crudBinding.value.data.length >= 5) {
        ElMessage.warning('已超借书上限，请还书后再借！')
        return
      }
      const now = new Date()
      for (let index = 0; index < crudBinding.value.data.length; index++) {
        const element = crudBinding.value.data[index]
        if (
          now.getTime() - element.borrow_time >
          1000 * 60 * 60 * 24 * store.limit_day
        ) {
          ElMessage.error('请将超期的书归还再借！')
          return
        }
      }

      formWrapperRef.value.open(crudBinding.value.addForm)
    }

    //定义验证器
    const descriptor = {
      sno: {
        required: true,
        len: 10,
        pattern: /^[0-9]+$/,
      },
    }
    const validator = new Schema(descriptor)

    // 查询学生
    function Search() {
      const data = crudExpose.getSearchFormData()
      validator.validate({ sno: data['sno'] }, (errors, fields) => {
        if (errors) {
          return
        }
        //获取学生信息
        GetObj(data['sno']).then((data) => {
          if (data != null) {
            stuInfo.value = data
            isCollapse.value = false
            store.limit_day = data.limit_day
            crudExpose.doSearch()
            crudRef.value.addForm.columns.sno.value = stuInfo.value.sno
          } else {
            isCollapse.value = true
            crudExpose.setTableData([])
            errorCreate('未查询到该学生')
          }
        })
      })
    }

    return {
      crudBinding,
      crudRef,
      handleBatchDelete,
      formWrapperRef,
      openFormWrapper,
      isCollapse,
      Search,
      stuInfo,
    }
  },
})
</script>

<style lang="scss">
.page-layout-card {
  background-color: #eee;
}
</style>
