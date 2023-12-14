//监听主进程发过来的消息
process.on('message',(msg)=>{
    console.log(msg);
})
//给主进程发消息
process.send('hello,我是子进程,收到请回答');