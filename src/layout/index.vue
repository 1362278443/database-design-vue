<template>
  <el-container class="fs-framework">
    <el-aside :width="'200px'" :trigger="null" collapsible>
      <div class="header-logo">
        <span class="title">图书管理系统</span>
      </div>
      <Menu></Menu>
    </el-aside>

    <el-container class="layout-body">
      <el-header>
        <Header />
      </el-header>
      <el-main class="fs-framework-content">
        <router-view>
          <template #default="{ Component, route }">
            <transition name="fade-transverse">
              <keep-alive>
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </transition>
          </template>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
</script>
<style lang="scss" scoped>
.fs-framework {
  height: 100%;
  overflow-x: hidden;
  .header-logo {
    width: 100%;
    height: 60px;
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
    .title {
      margin-left: 5px;
      font-weight: bold;
    }
  }
  .fs-framework-content {
    flex: 1;
    border-left: 1px solid #e5e7eb;
    overflow-x: hidden;
  }
  .layout-body {
    flex: 1;
  }
}
.fs-framework {
  &.el-container {
    flex-direction: row;
  }
  .el-aside {
    display: flex;
    flex-direction: column;
    transition: 0.2s;
    overflow-x: hidden;
    transition: 0.3s;
  }
  .el-main {
    padding: 0;
    background: #fff;
    height: 100%;
    position: relative;
  }
  .el-header {
    flex: 0;
    height: 60px;
    padding: 0 10px;
    line-height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
