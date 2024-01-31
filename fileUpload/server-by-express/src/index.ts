import express from 'express';
import fs from 'node:fs';
// import fsExtra from 'fs-extra';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));//获取当前文件的绝对路径
// 切片大小
const CHUNK_SIZE = 1024 * 1024 * 100; // 100MB
//创建临时文件夹,不存在才创建,存在不创建,也可以用path.resolve,来实现路径拼接
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

//创建文件真正存储的文件夹
const uploadDir = path.join(__dirname, '../upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
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

//文件上传接口--全部上传
app.post('/upload/:filename', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    //获取文件名
    const { filename } = req.params
    //创建写入流
    const writeStream = fs.createWriteStream(path.join(tempDir, filename));
    req.pipe(writeStream);
    req.on('end', () => {
        res.json({ message: "文件上传成功", status: 200 });
    })
    req.on('error', () => {
        res.json({ message: "文件上传失败", status: 400 });
    })
})

//切片上传文件接口
app.post('/slice/upload/:filename', async (req, res) => {
    //获取文件名
    const { filename } = req.params
    //切片名称
    const { chnkFilename } = req.query
    //拼接切片文件夹路径
    const chunkDir = path.resolve(tempDir, filename)
    //创建切片文件夹
    if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir)
    }
    //拼接切片文件路径
    const chunkPath = path.resolve(chunkDir, chnkFilename as string)
    //创建可读流
    const ws = fs.createWriteStream(chunkPath)
    // 将可读流中的数据写入到可写流中，完成文件上传
    await pipeStream(req, ws);
    res.json({ message: `切片${chnkFilename}上传成功`, status: 200 })
})

//切片合并接口
app.post('/slice/merge/:filename', async (req, res) => {
    //获取文件名
    const { filename } = req.params
    //拼接切片文件夹路径
    const chunkDir = path.join(tempDir, filename)
    //读取切片文件夹
    const files = fs.readdirSync(chunkDir)
    //创建可写流，用于合并切片文件
    if (!files || files.length === 0) {
        res.json({ message: "切片文件夹为空", status: 400 })
        return
    } else {
        //按照切片索引进行排序
        files.sort((a, b) => Number(a.split('-')[0]) - Number(b.split('-')[0]))
        //拼接真正上传的文件夹路径 
        const targetFilePath = path.resolve(uploadDir, filename)
        //创建写入文件的异步任务
        const writeTasks = files.map((chunkFilename, index) => {
            //拼接切片文件夹的路径
            const chunkPath = path.resolve(chunkDir, chunkFilename)
            //创建可读流
            const rs = fs.createReadStream(chunkPath)
            //创建可写流，用于合并切片文件,flags-a代表追加写入
            const start = index * CHUNK_SIZE; // 计算起始位置
            const ws = fs.createWriteStream(targetFilePath, { flags: 'a', start: start })
            return pipeStream(rs, ws)
        })
        //等待所有写入任务完成，并返回合并成功的消息和状态码200给前端
        await Promise.all(writeTasks)
        //合并完成,删除切片的临时文件夹
        // await fsExtra.rm(chunkDir, { recursive: true, force: true });
        fs.rmSync(chunkDir, { recursive: true, force: true })

        return res.json({ message: "切片合并成功", status: 200 })
    }
})

/**
 * 数据从可读流流向可写流
 * @param {ReadableStream} rs 可读流
 * @param {WritableStream} ws 可写流
 * @returns 返回一个Promise，当流结束时，Promise会被resolve
 */
function pipeStream(rs: fs.ReadStream | any, ws: fs.WriteStream) {
    return new Promise((resolve, reject) => {
        rs.pipe(ws).on("finish", resolve).on("error", reject);
    });
}


//启动服务
app.listen(8080, () => {
    console.log("Server is running http://localhost:8080");
})