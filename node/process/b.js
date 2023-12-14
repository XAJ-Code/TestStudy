const {exec,execSync,spawn,spawnSync,execFile,fork} =require('child_process');
const path = require('path');
//1.加sync就是同步方法，不加就是异步方法
//异步呢会返回一个回调函数
//exec----可以执行较小的shell脚本命令,有上限
//异步
exec('node -v',(err,stdout,stderr)=>{
    if(err)return
    //console.log(stdout.toString())
    
})
//同步方法
execSync('node -v').toString();

//spawn一样的，但是没有上线,返回的是一个流，实时返回
//同步
const a = spawnSync('node',['-v'])
//返回结果如下：
// {
//     status: 0,
//     signal: null,
//     output: [ null, <Buffer 76 31 36 2e 31 35 2e 30 0d 0a>, <Buffer > ],
//     pid: 29796,
//     stdout: <Buffer 76 31 36 2e 31 35 2e 30 0d 0a>,
//     stderr: <Buffer >
//   }
console.log(a.stdout.toString());
//异步
// const {stdout} = spawn('netstat')
const {stdout} = spawn('node',['-v'])
stdout.on('data',(data)=>{
    console.log(data.toString())
})
stdout.on('close',()=>{
    console.log('关闭了')
})

//execFile---执行可执行文件
execFile(path.resolve(__dirname,'./test.cmd'),null,(err,stdout,stderr)=>{
    if(err)return
    console.log(stdout.toString())
})

//7.fork---只针对js模块,创建一个子进程，进程之间也是可以相互通信的
//IPc通信底层基于libuv去实现的(windows named pipe)(posix unix domin socket)
const childProcess = fork(path.resolve(__dirname,'./childProcess.js'))
childProcess.send('我是主进程发送过来的消息')
childProcess.on('message',(data)=>{
    console.log(data)
})


