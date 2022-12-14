import { defineStore } from 'pinia'

const useStore = defineStore('app', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      // isCollapse: false, // 侧边栏是否收缩展示
    }
  },
})

export default useStore
