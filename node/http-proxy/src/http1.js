//第一个服务
const http = require("node:http")
const fs = require("node:fs")
const url = require('node:url')
const { createProxyMiddleware } = require('http-proxy-middleware')
const html = fs.readFileSync("./index.html")//读取html返回给客户端
const config = require("./proxy.config.js")//导入配置文件
//创建第一个服务
http.createServer((req, res) => {
    //获取请求地址
    const { pathname } = url.parse(req.url)
    //获取要代理的路由数组
    const proxyList = Object.keys(config.server.proxy)
    //匹配到就代理
    if (proxyList.includes(pathname)) {
        const proxy = createProxyMiddleware(config.server.proxy[pathname])
        console.log("代理请求", config.server.proxy[pathname],pathname)//{ target: 'http://localhost:8888', changeOrigin: true }
        proxy(req, res)//此时假如匹配到的地址就会被代理转发,例如：请求http://localhost:80/api就会被代理到http://localhost:8888
        return
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}).listen(80, () => {
    console.log("第一个服务已启动，监听80端口")
})