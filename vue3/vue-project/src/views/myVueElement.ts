import {defineCustomElement} from 'vue';

const HelloWorld = defineCustomElement({
    props:{},
    template:`<div>我是通过webComponents创建的vue组件</div>`,
    mounted() {
        console.log('mounted');
    },
    updated() {
        console.log('updated');
    },
})

customElements.define('my-vue-elel', HelloWorld);
const el = new HelloWorld();
//document.body.appendChild(el);// 或者直接使用<hello-world></hello-world>
export default el;