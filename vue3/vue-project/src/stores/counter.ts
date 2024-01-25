import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

//定义一个选项式的pinia仓库
export const useSelectedStore = defineStore('selected',{
  state:()=>({}),//这是一个箭头函数,表示return了一个空对象,相当于省略了return,也等价于()=>{return{}}
  getters:{},
  actions:{},
})