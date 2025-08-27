import { stat, createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const textPath = process.cwd() + '/assets/text/sample.txt';
console.log(process.cwd());
stat(textPath, (err, stats) => {
    if (err) {
        console.log(err);
    }
    if (stats.isFile()) {
        console.log('文件');
    }
    else {
        console.log('文件夹');
    }
    const fileCreateTime = stats.birthtime.getTime();
    //将时间戳转换成日期
    const date = new Date(fileCreateTime);
    console.log("文件的创建时间:" + date.toLocaleString() + date.toLocaleTimeString());
});
const rs = createReadStream(textPath, { encoding: 'utf-8', highWaterMark: 100 });
rs.on('data', (chunk) => {
    console.log("----chunk----");
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const writeTextPath = path.join(__dirname, 'text.txt');
const ws = createWriteStream(writeTextPath, { encoding: 'utf-8', highWaterMark: 100, flags: 'a' });
rs.pipe(ws);
