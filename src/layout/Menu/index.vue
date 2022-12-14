<template>
  <el-menu
    class="layout-menu"
    :default-active="activeMenu"
    :collapse-transition="false"
  >
    <menu-item v-for="(menu, key) in allRoutes" :key="key" :menu="menu" />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'
export default defineComponent({
  components: {
    MenuItem,
  },
  setup() {
    const allRoutes = useRouter().options.routes
    console.log(allRoutes)
    const route = useRoute()
    const activeMenu: any = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    return {
      allRoutes,
      activeMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout-menu {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
