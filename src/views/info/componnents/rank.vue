<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="rank">
    <div class="rank__header">
      <span>书籍借阅排行</span>
    </div>

    <div class="rank__container">
      <div class="rank__filter">
        <ul>
          <li
            v-for="(item, index) in types"
            :key="index"
            :class="{
              active: item.value == type,
            }"
            @click="changeDate(item.value)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>

      <ul v-if="list?.length != 0" class="rank__list">
        <li v-for="(item, index) in list">
          <span>{{ index }}</span>
          <span>{{ item.name }}</span>
          <span>{{ item.number }}</span>
        </li>
      </ul>
      <el-empty description="暂时没有排名" />
    </div>
  </div>
</template>

<script lang="ts">
import { GetBookRank } from '@/api'

export default defineComponent({
  setup() {
    const date = ref<Array<string>>([])
    const type = ref<string>('day')
    const types = ref<Array<any>>([
      {
        label: '今日',
        value: 'day',
      },
      {
        label: '本周',
        value: 'week',
      },
      {
        label: '本月',
        value: 'month',
      },
      {
        label: '全年',
        value: 'year',
      },
    ])

    const list = ref<Array<any>>()

    GetBookRank(type.value).then((data) => {
      list.value = data
    })

    const changeDate = (value: string) => {
      type.value = value
      GetBookRank(type.value).then((data) => {
        list.value = data
      })
      console.log(list.value)
    }

    return {
      changeDate,
      types,
      date,
      type,
      list,
    }
  },
})
</script>

<style lang="scss" scoped>
.rank {
  &__header {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 15px;
    font-weight: bold;
    padding: 0 20px;
  }

  &__container {
    padding: 0 20px;
    height: 300px;
  }

  &__filter {
    display: flex;
    align-items: center;
    height: 30px;

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 200px;
      margin-right: 20px;
      padding: 0;

      li {
        list-style: none;
        font-size: 14px;
        cursor: pointer;
        color: #d8d8d8;
        white-space: nowrap;
        margin-right: 10px;

        &.active {
          color: #000;
        }

        &:not(.active):hover {
          color: #999;
        }
      }
    }
  }

  &__list {
    height: 260px;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      height: 52px;
      list-style: none;
      font-size: 13px;
      cursor: pointer;

      span {
        &:first-child {
          display: inline-block;
          height: 14px;
          width: 14px;
          border-radius: 14px;
          text-align: center;
          line-height: 14px;
          font-size: 12px;
        }

        &:nth-child(2) {
          flex: 1;
          margin: 0 10px;
          letter-spacing: 0.5px;
          color: #222;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }

      &:nth-last-child(n + 3) {
        span {
          &:first-child {
            background-color: rgb(69, 174, 255);
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
