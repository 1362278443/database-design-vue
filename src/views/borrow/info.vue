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
      kooriookami
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
      18100000000
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
      Suzhou
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="icon">
            <tickets />
          </el-icon>
          状态
        </div>
      </template>
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="icon">
            <List />
          </el-icon>
          详细
        </div>
      </template>
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup lang="ts">
defineProps({
  name: String,
  dep: String,
  pro: String,
  OverExcept: Number,
  OverExceptList: Array,
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
