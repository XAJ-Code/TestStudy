import express from 'express';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));//获取当前文件的绝对路径
//创建临时文件夹,不存在才创建,存在不创建,也可以用path.resolve,来实现路径拼接
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

//创建expresstrue
const app = express();

//跨域中间件
app.use(cors());


//测试接口
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    console.log(tempDir);
    res.json({ message: "Hello World" });
})

//文件上传接口
app.post('/upload/:filename', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    //获取文件名
    const { filename } = req.params
    //创建写入流
    const writeStream = fs.createWriteStream(path.join(tempDir,filename));
    req.pipe(writeStream);
    req.on('end',()=>{
        res.json({ message: "文件上传成功",status:200 });
    })
    req.on('error',()=>{
        res.json({ message: "文件上传失败",status:400 });
    })
})



//启动服务
app.listen(8080, () => {
    console.log("Server is running http://localhost:8080");
})