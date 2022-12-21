<template>
  <div class="page-layout-card">
    <Card />
    <el-row :gutter="15">
      <el-col :lg="14" :xs="24">
        <div class="card">
          <chart />
        </div>
      </el-col>
      <el-col :lg="10" :xs="24">
        <div class="card">
          <rank />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :lg="12" :xs="24">
        <RouterLink to="/info/book_info">
          <el-card>
            <div class="link-card">
              <div class="link-card-left">
                <el-icon size="170"><Collection /></el-icon>
              </div>
              <div class="link-card-right">书籍信息</div>
            </div>
          </el-card>
        </RouterLink>
      </el-col>
      <el-col :lg="12" :xs="24">
        <RouterLink to="/info/student_info">
          <el-card>
            <div class="link-card">
              <div class="link-card-left">
                <el-icon size="170"><User /></el-icon>
              </div>
              <div class="link-card-right">学生信息</div>
            </div>
          </el-card>
        </RouterLink>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import Card from './card/index.vue'
import Chart from './componnents/chart.vue'
import rank from './componnents/rank.vue'
</script>
<style lang="scss">
.page-layout-card {
  padding: 10px;
  background-color: var(--system-menu-background);
  .card {
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 12px;
    letter-spacing: 0.5px;

    &__header {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 20px;

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
      }
    }

    &__container {
      padding: 0 20px;
      height: 50px;
    }

    &__footer {
      display: flex;
      align-items: center;
      height: 50px;
      border-top: 1px solid #f7f7f7;
      font-size: 12px;
      margin: 0 5px;
      padding: 0 15px;
      box-sizing: border-box;

      .label {
        margin-right: 10px;
      }

      .value {
        font-size: 13px;
      }
    }
  }
  .link-card {
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    margin: 10px;
    width: 100%;
    &-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: 20px;
      .el-icon {
        color: #409efc;
      }
    }
    &-right {
      padding-left: 50px;
      font-size: 50px;
      font-weight: bold;
      color: #606266;
    }
  }
}
</style>
