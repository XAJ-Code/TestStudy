//启动第二个服务--真实的服务器(要代理到的地址)
const http = require('node:http');
http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('第二个服务返回的,你代理成功了');
}).listen(8888,()=>{
    console.log('第二个服务启动成功,端口号8888');
});