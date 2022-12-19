<template>
  <el-descriptions class="margin-top" title="书籍信息" :column="2" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="icon">
            <Collection />
          </el-icon>
          书名
        </div>
      </template>
      {{ name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="icon">
            <OfficeBuilding />
          </el-icon>
          出版社
        </div>
      </template>
      {{ pub }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="icon">
            <Calendar />
          </el-icon>
          出版日期
        </div>
      </template>
      {{ new Date(props.time).toLocaleDateString() }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="icon">
            <Location />
          </el-icon>
          位置
        </div>
      </template>
      {{ locate }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup lang="ts">
const props = defineProps({
  name: String,
  pub: String,
  time: Number,
  locate: String,
})
</script>
<style lang="scss" scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  font-weight: 700;
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
.icon {
  margin-right: 6px;
}
</style>
