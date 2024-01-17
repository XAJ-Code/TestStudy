<template>
  <div ref="div" id="as">
    <my-div></my-div>
    <renderDom :name="'855'">
      <p>我睡</p>
    </renderDom>
    <button>点我</button>
    <my-vue-elel></my-vue-elel>
    <!-- <HelloWorld></HelloWorld> -->
    <div>Mouse position is at: {{ x }}, {{ y }}</div>
  </div>
</template>
<!-- 组合式API写法：直接返回h函数，交给模板去渲染 -->
<!-- 也可以不通过模板，手动调用render函数去挂载和渲染 -->
<script setup lang="ts">
import renderDom from './test'
import { useMouse } from '@/hooks/mouse'
import myVueElel from './myVueElement'
const { x, y } = useMouse()
import { h, watchPostEffect, watch, ref, provide, readonly,onRenderTracked,onRenderTriggered } from 'vue';
//调试查看哪些依赖正在被使用
onRenderTracked(() =>{
  // eslint-disable-next-line no-debugger
  // debugger
})
//确定哪个依赖正在触发更新
onRenderTriggered(()=>{

})


// console.log(attrs)
provide('a', readonly({ a: 1 }))
//监听--立即执行--有响应式依赖缓存的-DOM更新后执行
watchPostEffect(
  () => {
    console.log('watchPostEffect')
  }
)
const a = ref(1)
//最后一个参数是配置项，flush:'post'表示在DOM更新之后再执行
watch(() => a.value, () => {

}, { flush: 'post' })

// const div = ref<HTMLElement>()
// export default{
//     setup(){
//       return ()=>h('div',{id:'852585'},'852')
//     },
// }
//<!-- 组合式API写法：直接返回h函数，交给模板去渲染 -->
const myDiv = () => {
  //h函数返回的是一个虚拟DOM
  return h('div',
    Array.from({ length: 2 }).map(() => {
      return h('p', { class: 'p' }, 'hi')
    })
  )
}
// myDiv()
// render(myDiv(), document.body)
// 也可以不通过模板，手动调用render函数去挂载和渲染
// const vnode = myDiv()
// const mount:HTMLElement = document.createElement('div')
// mount.setAttribute('id','as')
// console.log(mount);
// 虚拟DOM最终会被渲染器调用render函数，来创建为真实的DOM元素
// render(vnode,mount)
</script>
