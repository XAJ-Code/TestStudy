
const http = require('node:http');
const url = require('node:url');

//在传输层实现的
//req---request:请求头、参数等信息
//res---response:响应头、返回状态码等
const server = http.createServer((req, res) => {
    //获取路由地址
    const { pathname,query } = url.parse(req.url, true)
    if (req.method === 'GET') {
        //判断路由
        if (pathname === '/getUserInfo') {
            let obj = {
                name: '张三',
                age: 18
            }
            //get请求的query参数可以通过url.parse就能解析出来
            console.log(query)
            res.end(JSON.stringify(obj))
        } else {
            res.statusCode = 404
            res.end('404 not found')
        }
    } else if (req.method === 'POST') {
        //接受body参数
        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk.toString()
        })
        req.on('end',()=>{
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200 // 设置响应状态码为200
            res.end(postData)
        })
    }
}).listen(98, () => {
    console.log("服务器启动成功,端口号是98")
})