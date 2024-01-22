import babel from '@babel/core'
import fs from 'node:fs'

//在webPack中使用是用babel-loader的方式去使用的

const code = fs.readFileSync('./index.js', 'utf-8')
//async是异步;sync是同步
// const transFormCode = babel.transformSync(code,{
//     presets:[[
//         '@babel/preset-env',//es6转为es5
//         {
//            useBuiltIns: 'usage',//按需引入
//            corejs: 3,//corejs的版本,配合coreJS来转换es6及以上的新特性
//         }
//     ]]
// })
// console.log(transFormCode.code);

//在根目录下创建好babel的配置文件,可以指定root(根文件夹),babel会自动去该目录下寻找配置文件
//用配置文件的方式--只能调用异步去转换
babel.transformAsync(code).then(res => {
    const writeStrem = fs.createWriteStream('./target.js')
    writeStrem.write(res.code)
    writeStrem.close(() => {
        console.log('代码转化完成');
    })
})
// const writeStrem = fs.createWriteStream('./target.js')
// // writeStrem.write(transFormCode.code)
// writeStrem.close(()=>{
//     console.log('代码转化完成');
// })
