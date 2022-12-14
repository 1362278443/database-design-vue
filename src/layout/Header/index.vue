<template>
  <header>
    <div class="left-box">
      <Breadcrumb />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
export default defineComponent({
  components: {
    Breadcrumb,
  },
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-right: 22px;
}
.left-box {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
