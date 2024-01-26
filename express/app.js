import express from "express";
import User from "./src/user.js";
const PORT = 89;
const app = express();
app.use(express.json()); // 解析请求体--post
//中间件
app.use("/user", User);
/**
 * 添加一个中间件函数，用于打印请求信息并调用next()函数
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 调用下一个中间件函数的函数
 */
app.use((req, res, next) => {
  // 调用next()函数，继续执行下一个中间件函数
  next();
});

app.get("/hello", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.post("/upload", (req, res) => {
  res.send("<h1>恭喜你,成功调用post请求</h1>");
});

//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

//测试sse
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // 发送消息
  setInterval(() => {
    res.write("data: Hello, world!\n\n");
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
