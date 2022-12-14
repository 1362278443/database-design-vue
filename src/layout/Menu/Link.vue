<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'appLink',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const linkProps = (to) => {
      return {
        to: to,
      }
    }
    return {
      type: 'router-link',
      linkProps,
    }
  },
})
</script>
<style lang="scss"></style>
