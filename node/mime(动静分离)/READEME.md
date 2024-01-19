# NodeJs实现动静分离

## 1.什么是动静分离
在Node.js中，实现动静分离可以通过不同的路由规则来区分动态请求和静态请求。动态请求通常由后端服务器处理，而静态请求则可以直接由Node.js处理并返回给客户端。这样可以提高服务器的性能和效率。
1. 创建一个Node.js服务器，监听指定端口。
2. 配置路由规则，根据不同的URL路径，将动态请求和静态请求分发到不同的处理函数或中间件。
3. 动态请求的处理函数或中间件可以调用后端服务器，获取动态数据。
4. 静态请求的处理函数或中间件可以直接返回静态文件，例如HTML、CSS、JavaScript等。
5. 服务器可以根据需要使用不同的HTTP服务器库，例如Express、Koa等。
6. 可以根据需要使用不同的文件服务中间件，例如serve-static、multer等。
7. 可以根据需要使用不同的模板引擎，例如ejs、pug等。

## 2.实现静态分离的好处
1. **性能优化:** 提高服务器的性能和效率,将静态资源与动态内容分离可以提高网站的加载速度。由于静态资源往往是不变的，可以使用缓存机制将其存储在CDN（内容分发网络）或浏览器缓存中，从而减少网络请求和数据传输的开销。
2. **安全:** 静态资源通常不会包含敏感信息，因此可以更轻松地保护它们。
3. **易于维护:** 静态资源通常不需要经常更新，因此可以更容易地管理和维护。

## 3.实现静态分离的步骤
1. 创建一个Node.js服务器，监听指定端口。可以使用内置的http或https模块，或者使用第三方库，例如Express或Koa。
```js
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
```
2. 常见的MIME类型
:::tip
- 文本文件
  - text/html: HTML格式
  - text/plain: 纯文本格式
  - text/css: CSS格式
  - application/json: JSON格式
:::

:::tip
- 图像文件
  - image/jpeg：JPEG 图像
  - image/png：PNG 图像
  - image/gif：GIF 图像
  - image/svg+xml：SVG 图像
:::

:::tip
- 音频文件
 - audio/mpeg：MPEG 音频
 - audio/wav：WAV 音频
 - audio/midi：MIDI 音频
:::
