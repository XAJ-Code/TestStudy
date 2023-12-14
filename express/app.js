import express from 'express';
import mountMethodDemo from './routes/method.js';
const PORT = 5005;
const app = express();
app.use(express.json());
//中间件
/**
 * 添加一个中间件函数，用于打印请求信息并调用next()函数
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 调用下一个中间件函数的函数
 */
app.use((req, res, next) => {
    // 从请求对象中获取请求方法、路径、请求头和请求体
    const { method, path, headers, body } = req
    // 打印请求信息
    console.log(method, path, headers['if-none-match'], body);
    // 调用next()函数，继续执行下一个中间件函数
    next()
})

mountMethodDemo(app)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});