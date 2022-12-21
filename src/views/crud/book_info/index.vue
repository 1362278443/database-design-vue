<template>
  <fs-page class="page-layout-card">
    <fs-crud ref="crudRef" v-bind="crudBinding">
      <template #cell_inventory="scope">
        <el-progress
          :percentage="(scope.row.nowBorrow / scope.row.inventory) * 100"
          :stroke-width="10"
          :color="colors"
        >
          <span>{{ scope.row.nowBorrow }}/{{ scope.row.inventory }}</span>
        </el-progress>
      </template>
    </fs-crud>
  </fs-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import createCrudOptions from './crud'
import { useExpose, useCrud } from '@fast-crud/fast-crud'

export default defineComponent({
  name: 'book_info',
  setup() {
    // crud组件的ref
    const crudRef = ref()
    // crud 配置的ref
    const crudBinding = ref()
    // 暴露的方法
    const { crudExpose } = useExpose({ crudRef, crudBinding })
    // 你的crud配置
    const { crudOptions } = createCrudOptions({ crudExpose })
    // 初始化crud配置
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const { resetCrudOptions } = useCrud({ crudExpose, crudOptions })
    // 你可以调用此方法，重新初始化crud配置
    // resetCrudOptions(options)
    // 页面打开后获取列表数据
    onMounted(() => {
      crudExpose.doRefresh()
    })

    const colors = [
      { color: '#67C23A', percentage: 60 },
      { color: '#E6A23C', percentage: 80 },
      { color: '#F56C6C', percentage: 100 },
    ]

    return {
      colors,
      crudBinding,
      crudRef,
    }
  },
})
</script>

<style lang="scss">
.page-layout-card {
  background-color: var(--system-menu-background);
}
</style>
