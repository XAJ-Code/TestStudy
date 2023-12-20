console.log(import.meta.env.MODE);

// import { createServer } from 'vite'
// createServer()
/**
 * 这种导入方式，会把css注入页面
 * ?inline，不会注入页面，会把该css文件包装为一个模块导出
 */
import './css/style.css'
/**
 * css文件以.module.css为后缀名的会被认为是一个 CSS modules 文件。导入这样的文件会返回一个相应的模块对象：
 */
import styles from './css/test.module.css'
const divEl = document.createElement('div')
divEl.className=styles.title,
divEl.innerHTML = '你好，vite',
document.body.appendChild(divEl)

//导入一个静态资源会返回解析后的 URL：
import imgUrl from '../image.png'
const imgEl:HTMLImageElement = document.createElement('img')
imgEl.src = imgUrl
document.body.appendChild(imgEl)
//vite内部特殊的import.meta.glob 函数从文件系统导入多个【模块】：
// const modules = import.meta.glob('./css/*.css')
// for (const path in modules){
//     console.log(modules[path]);//() => import("/src/css/style.css")是一个函数
//     modules[path]().then(r=>{
//         console.log(modules[path],r);
//     })
// }