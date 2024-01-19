//导入需要使用的模块
import http from 'node:http' // 导入http模块
import fs from 'node:fs' // 导入文件系统模块
import path from 'node:path' // 导入路径处理模块
import mime from 'mime' // 导入mime模块
http.createServer((req, res) => {
    const { url, method } = req
    //处理静态资源
    if (method === 'GET' && url.startsWith('/static')) {
        const filePath = path.join(process.cwd(), url); // 获取文件路径
        const fileStream = fs.createReadStream(filePath); // 创建可读流
        res.setHeader('Content-Type', mime.getType(filePath)); // 设置响应头，指定文件类型
        res.statusCode = 200; // 设置响应状态码
        res.setHeader('Cache-Control', 'public,max-age:3600'); // 设置响应头，缓存资源,3600s=1h
        fileStream.pipe(res); // 将文件流写入响应流中
        fileStream.on('error',()=>{
            res.statusCode = 404;
            res.end('File not found!');
        })
        fileStream.on('end',()=>{
            res.end();
        })
    }
    //处理动态资源
    if((method === 'GET' || method === 'POST') && url.startsWith('/api')){
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify({message:'Hello World!'}))
    }
}).listen(89,()=>{
    console.log('Server is running on http://localhost:89');
});