<template>
  <div class="card-list">
    <Row v-for="row in list" :key="row.id" :row="row" />
  </div>
</template>

<script lang="ts">
import Row from './row.vue'
import { GetSumBook, GetSumStudent, GetSumBorrow, GetSumFine } from '@/api'

export default defineComponent({
  components: {
    Row,
  },
  setup() {
    const list = ref([
      {
        id: 1,
        name: '图书总量',
        data: 0,
        color: '#4e73df',
      },
      {
        id: 2,
        name: '注册学生总量',
        data: 0,
        color: '#1cc88a',
      },
      {
        id: 3,
        name: '累计借出量',
        data: 0,
        color: '#36b9cc',
      },
      {
        id: 4,
        name: '累计罚金(分)',
        data: 0,
        color: '#f6c23e',
      },
    ])

    //获取数据
    GetSumBook().then((data) => {
      list.value[0].data = data
    })
    GetSumStudent().then((data) => {
      list.value[1].data = data
    })
    GetSumBorrow().then((data) => {
      list.value[2].data = data
    })
    GetSumFine().then((data) => {
      list.value[3].data = data
    })

    return {
      list,
    }
  },
})
</script>

<style lang="scss" scoped>
.card-list {
  width: calc(100% + 20px);
  margin-left: -10px;
  display: flex;
  flex-wrap: wrap;
}
</style>
