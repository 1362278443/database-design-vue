<template>
  <fs-page class="page-layout-card">
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #header-bottom>
        <transition name="fade-scale">
          <el-card v-if="!isCollapse">
            <student-info
              :name="stu_info.name"
              :dep="stu_info.dep"
              :pro="stu_info.pro"
            ></student-info>
          </el-card>
        </transition>
      </template>
      <template #pagination-left>
        <el-tooltip content="批量还书">
          <fs-button icon="Finished" @click="handleBatchDelete"></fs-button>
        </el-tooltip>
      </template>
      <template #form-body-bottom>
        <book-info
          v-if="!is_borrow"
          :name="book_info.name"
          :pub="book_info.pub"
          :time="book_info.time"
          :locate="book_info.locate"
        ></book-info>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import createCrudOptions from './crud'
import { useExpose, useCrud } from '@fast-crud/fast-crud'
import { BatchDelete } from './api'
import studentInfo from './studentInfo.vue'
import bookInfo from './bookInfo.vue'
import { ElNotification } from 'element-plus'

export default defineComponent({
  components: {
    studentInfo,
    bookInfo,
  },
  name: 'book', // 实际开发中可以修改一下name
  setup() {
    // crud组件的ref
    const crudRef = ref()
    // crud 配置的ref
    const crudBinding = ref()
    // 暴露的方法
    const { crudExpose } = useExpose({ crudRef, crudBinding })
    // 你的crud配置
    const {
      crudOptions,
      selectedIds,
      selectedtime,
      isCollapse,
      stu_info,
      is_borrow,
      book_info,
    } = createCrudOptions({
      crudExpose,
    })
    // 初始化crud配置
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { resetCrudOptions } = useCrud({ crudExpose, crudOptions })
    // 你可以调用此方法，重新初始化crud配置
    // resetCrudOptions(options)

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
                  1000 * 60 * 60 * 24 * stu_info.value.limit_day
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

    return {
      crudBinding,
      crudRef,
      handleBatchDelete,
      isCollapse,
      is_borrow,
      stu_info,
      book_info,
    }
  },
})
</script>

<style lang="scss">
.page-layout-card {
  background-color: #eee;
}
</style>
