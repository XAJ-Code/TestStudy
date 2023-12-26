//服务端渲染
import { createSSRApp,defineCustomElement,defineComponent,createApp } from 'vue'
import { renderToString,renderToWebStream } from 'vue/server-renderer'
const app = createSSRApp({
    template: `<div>{{name}}</div>`,
    data: () => ({ name: '晓澳军' }),
})
renderToString(app).then((html)=>{
    console.log(html)
})

// const myVueElement = defineCustomElement({
//     template: `<button @click="count++">{{count}}</button>`,
//     data: () => ({ count: 1 })
// })
// customElements.define('my-vue-element', myVueElement)

// class myDivElement extends HTMLDivElement{
//     connectedCallback(){
//         console.log('connectedCallback')
//     }
// }