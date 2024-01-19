const http = require("node:http");
const request = http.get("http://localhost:98/getUserInfo",(res)=>{
    console.log('请求发送成功');
})

request.on("response",(res)=>{
    console.log('服务器响应成功');
    res.on("data",(chunk)=>{
        console.log(chunk.toString());
    })
    res.on("end",()=>{
        console.log('响应中数据接收完成');
    })
    res.on("error",(err)=>{
        console.log(err.message);
    })
})