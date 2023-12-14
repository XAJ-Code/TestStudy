// import  os  from 'node:os';
//console.log(process.arch,os.arch());//返回cpu架构===os中的arch（）

//console.log(process.cwd());//返回当前的工作目录,相当于__dirname或者path.dirname(fileUrlToPath(import.meta.url))

//console.log(process.argv);//返回携带的参数

//console.log(process.memoryUsage());//返回当前进程的内存信息
//process.env.NODE_ENV='development';//设置环境变量或者在通过cross-env Node_ENV='dev'来设置环境变量
//用于读取操作系统所有的环境变量，也可以修改和查询环境变量
//console.log(process.env);//返回当前进程所有的环境变量
// cross-env 是 跨平台设置和使用环境变量 不论是在Windows系统还是POSIX系统。
// 同时，它提供了一个设置环境变量的脚本，使得您可以在脚本中以unix方式设置环境变量，然后在Windows上也能兼容运行
// 原理就是，如果是windows 就调用SET 如果是posix 就调用export 设置环境变量
//set NODE_ENV=production  #windows
//export NODE_ENV=production #posix

//打开网站
const exec = require('node:child_process').exec;
//引入path模块，用commonjs的形式
const path = require('node:path');
const { fileURLToPath } = require('node:url');
//打开浏览器
// path.dirname(fileURLToPath(import.meta.url)))
exec(` ${'http://www.baidu.com'}`, (e) => {
    console.log(path.resolve(__dirname, '.', 'src/'));
})//win系统
process.cwd()//相当于__dirname,esm模式下不支持可以用cwd()来代替
setTimeout(() => {
    console.log(process.pid);//返回当前进程的进程号
    console.log(process.platform);//返回当前运行的操作系统平台
    console.log(process.uptime());//返回当前进程已运行的时间
    console.log(process.arch);//返回node的cpu架构
}, 5000);
//监听进程退出
process.on('exit', (code) => {
    console.log(`进程退出了`)
})
process.addListener
// process.on('')
setTimeout(() => {
    process.exit();//退出进程
}, 2000)