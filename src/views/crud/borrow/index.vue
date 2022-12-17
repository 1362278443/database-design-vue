<template>
  <fs-page class="page-layout-card">
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #pagination-left>
        <el-tooltip content="批量还书">
          <fs-button icon="Finished" @click="handleBatchDelete"></fs-button>
        </el-tooltip>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import createCrudOptions from './crud'
import { useExpose, useCrud } from '@fast-crud/fast-crud'
import { BatchDelete } from './api'

export default defineComponent({
  name: 'book', // 实际开发中可以修改一下name
  setup() {
    // crud组件的ref
    const crudRef = ref()
    // crud 配置的ref
    const crudBinding = ref()
    // 暴露的方法
    const { crudExpose } = useExpose({ crudRef, crudBinding })
    // 你的crud配置
    const { crudOptions, selectedIds } = createCrudOptions({ crudExpose })
    // 初始化crud配置
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { resetCrudOptions } = useCrud({ crudExpose, crudOptions })
    // 你可以调用此方法，重新初始化crud配置
    // resetCrudOptions(options)
    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh()
    })

    const handleBatchDelete = async () => {
      if (selectedIds.value?.length > 0) {
        await ElMessageBox.confirm(
          `确定要批量归还这${selectedIds.value.length}本书吗`,
          '确认'
        )
        await BatchDelete(selectedIds.value)
        ElMessage.success('归还成功')
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
    }
  },
})
</script>

<style lang="scss">
.page-layout-card {
  background-color: #eee;
}
</style>
