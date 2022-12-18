import { defineStore } from 'pinia'

const studentStore = defineStore('app', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      limit_day: 30, // 借书最大天数
    }
  },
})

export default studentStore
