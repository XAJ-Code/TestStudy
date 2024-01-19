# NodeJs 内置模块-http

## 1. 概念

Node.js 中最常用的内置模块之一，许多第三方的网络库都是基于它封装的，
(http / https)[https://nodejs.org/docs/latest-v18.x/api/https.html] 模块可用于创建 HTTP 服务器，也可用于向已有服务发起请求并获取响应。

1. 创建一个 HTTP 服务器,通过监听特定的端口，等待客户端的请求，并返回响应。
2. 向已有服务发起请求,通过向指定的 URL 发送请求，并获取响应。
3. 构建 RESTful API,通过 http 模块，可以方便的构建 RESTful API,(如 GET、POST、PUT、DELETE 等),通过解析请求参数、验证身份以及生成相应的 JSON 或数据格式，来构建 RESTful API。
4. 也可以用来构建代理服务器,用于转发客户端的请求到其他服务器。代理服务器可以用于负载均衡、缓存、安全过滤或跨域请求等场景
5. 文件服务器："http" 模块可以用于创建一个简单的文件服务器，用于提供静态文件（如 HTML、CSS、JavaScript、图像等）。通过读取文件并将其作为响应发送给客户端，你可以轻松地构建一个基本的文件服务器

## 2.创建 http 服务器

```js
const http = require("http");
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});
server.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
```

## 3. 向已有服务发起请求并获取响应。

```js
const http = require('node:http');
const options = {
  hostname: "www.example.com",
  port: 80,
  path: "/api/data",
  method: "GET",
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);

  res.on("data", (chunk) => {
    console.log(`响应内容: ${chunk}`);
  });
});

req.on("error", (e) => {
  console.error(`请求出错: ${e.message}`);
});

req.end();
```

## 4. 构建 RESTful API

```js
const http = require('node:http');
const url = require('node:url');

const server = http.createServer((req, res) => {
    //获取路由地址
    const { pathname,query } = url.parse(req.url, true)
  if (req.url === "/api/data" && req.method === "GET") {
    // 处理GET请求
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Hello, World!" }));
  } else if (req.url === "/api/data" && req.method === "POST") {
    // 处理POST请求
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log("Received POST data:", body);
      res.statusCode = 201;
      res.end();
    });
  } else {
    // 处理其他请求
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("服务器运行在 http://127.0.0.1:3000/");
});
```
可以通过(apiPost)[https://apifox.com/]来测试API
* ![image-20231028165624118](../../assets/images/apiFox.png)

## 5. 处理文件上传

```js
const http = require("http");
const formidable = require("formidable");

const server = http.createServer((req, res) => {
  if (req.url === "/upload" && req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("文件上传失败:", err);
        res.statusCode = 500;
        res.end();
        return;
      }
      console.log("上传的文件信息:", files);
      res.statusCode = 200;
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("服务器运行在 http://127.0.0.1:3000/");
});
```

## 6. 处理 WebSocket 连接

```js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("客户端已连接");

  ws.on("message", (message) => {
    console.log("接收到消息:", message);
    ws.send(`服务器收到消息: ${message}`);
  });

  ws.on("close", () => {});
});
```
