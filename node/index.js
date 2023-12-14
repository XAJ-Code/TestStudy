//node的全局API,无需引用
import path from 'node:path';
import { fileURLToPath } from 'node:url';
//console.log(__dirname,__filename)//这是在commjs中的规范
//import.meta.url--当前作用上下文的元信息
console.log(fileURLToPath(import.meta.url));//fileURLToPath这是在esm中的规范===commjs中的__fileName
console.log(path.dirname(fileURLToPath(import.meta.url)));//这是在esm中的规范 ===commjs中的__dirname
console.log(path.resolve());//解析相对路劲,返回当前绝对路径，例：'./index'--->返回的是D:\my\studyNodeJs\node(不包括文件)
const __dirname = path.dirname(fileURLToPath(import.meta.url));//es模块下这么写,cmj直接用，是一个全局变量
console.log(path.resolve(__dirname,'./index.js'));//返回的是D:\my\studyNodeJs\node\index.js,路径拼接
import os from 'node:os'
import { exec } from 'child_process'
import { JSDOM } from 'jsdom'
console.log('获取到的系统', os.platform())
// console.log('获取到的cpu架构', os.arch());
//根据系统判断打开网页
function openUrlByBrowser(url) {
    if (os.platform() === 'drawin') {
        exec(`open ${url}`);//mac系统
    } else if (os.platform() === 'win32') {
        exec(`start ${url}`)//win系统
    } else {
        exec(`xdg-open ${url}`)//linux系统
    }
}
// openUrlByBrowser('http://www.baidu.com');

//创建JSDom
// const dom = new JSDOM(`<!DOCTYPE html><div id='app'></div>`);
const dom = new JSDOM(`<!DOCTYPE html><div id='app'></div>`);
//定义document对象
const document = dom.window.document;//global是一个全局变量
//定义window对象
const window = dom.window;
//发送请求获取图片数据
import fetch from 'node-fetch';
//.then是异步请求,需要await等待一下，或者把操作同时放进异步之后的回调函数
// await fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1').then(res =>res.json()).then(r => {
//     //获取dom节点
//     const app = document.getElementById('app');
//     r.forEach(item => {
//         const img = document.createElement('img');
//         img.src = item.url;
//         img.style.width = '200px'
//         img.style.height = '200px'
//         app.appendChild(img);
//     })
//     // fs.writeFileSync('./index.html', dom.serialize())
// })
//创建html文件
import fs from 'node:fs'
// fs.writeFileSync('./index.html', dom.serialize())

//path部分
console.log(path.dirname('/Users/junjie/Desktop/test/index.html'));//返回除最后一项的其他部分
console.log(path.basename('/Users/junjie/Desktop/test/index.html'));//返回最后一项