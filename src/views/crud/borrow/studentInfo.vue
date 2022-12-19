<template>
  <el-descriptions class="margin-top" title="借书人信息" :column="3" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="icon">
            <user />
          </el-icon>
          姓名
        </div>
      </template>
      {{ name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="icon">
            <School />
          </el-icon>
          系别
        </div>
      </template>
      {{ dep }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="icon">
            <Collection />
          </el-icon>
          专业
        </div>
      </template>
      {{ pro }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup lang="ts">
const props = defineProps({
  name: String,
  dep: String,
  pro: String,
})
</script>
<style lang="scss" scoped>
.el-descriptions {
  margin-top: 20px;
  max-width: 600px;
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
