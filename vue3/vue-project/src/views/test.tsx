import { defineComponent} from "vue"

//第一种方式-导出一个函数
// const a = ref(1)
// export default function renderDom (props){
//     return(
//         <>
//         <h1>给我渲染+{a.value}</h1>
//         <h1>{1+2}</h1>
//          <h1>{props}</h1>
//         </>
//     )
// }
//第二种--选项是API,用render函数返回标签
// export default defineComponent({
//     data() {
//         return {
//             a: 1
//         }
//     },
//     methods:{

//     },
//     setup(){
//     },
//     render(){
//         return(
//             <>
//             <h1>给我渲染+{this.a}</h1>
//             <h1>{1+2}</h1>
//             </>
//         )
//     }
// })
//第三种--组合式API,在setup函数种返回
export default defineComponent({
    props:{
        name:String
    },
    setup(props:any, ctx:any) {
        return () => (
            <>
            <h2>{ctx.slots.default()}</h2>
            <h3>{props.name}</h3>
            </>
        )
    },
})