
//导入fs和zlib
const fs = require('node:fs');
const zlib = require('node:zlib');
//压缩----gzip算法
/**
 * @param {string} path 要压缩的文件路径
 * @param {function} callback 回调函数
 */
function gzip (path, callback) {
  //创建读取流
  const readStream = fs.createReadStream(path);
  //创建写入流
  const writeStream = fs.createWriteStream(path + '.gz');
  //调用createGzip拿到压缩后的值
  const gzipInfo = zlib.createGzip({ info: true });
  //将读取流和gzip流连接起来
  readStream.pipe(gzipInfo).pipe(writeStream);
  //监听写入流的完成事件
  writeStream.on('finish', () => {
    console.log('文件压缩完成');
    // 如果存在回调函数，则执行回调函数
    callback && callback();
    // 关闭读取流
    readStream.close();
    // 关闭写入流
    writeStream.close();
  });
}
// gzip('./index.txt')

//解压----gunzip算法
function gunzip (path, callback) {
  //创建读取流
  const readStream = fs.createReadStream(path);
  //创建写入流
  const writeStream = fs.createWriteStream(path + '.txt');
  //创建gunzip流
  const gunzipStream = zlib.createGunzip()
  //将读取流和gunzip流连接起来
  readStream.pipe(gunzipStream).pipe(writeStream);
  writeStream.on('finish', () => {
    console.log('文件解压完成');
    // 如果存在回调函数，则执行回调函数
    callback && callback();
    // 关闭读取流
    readStream.close();
    // 关闭写入流
    writeStream.close();
  });
}

// gunzip('./index.txt.gz')

//http压缩
const http = require('node:http')
//先启动一个服务
http.createServer((req, res) => {
  const text = 'hello world'.repeat(10000);//模拟生成一万条响应数据
  //设置响应头为纯文本
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  //设置响应头为gzip--流浪器默认是可以解析的
  res.setHeader('Content-Encoding', 'gzip');
  //先在服务端压缩一下在返回---返回的一个buffer
  //这里用gzip或者deflate都可以--记得同步切换响应头
  // const deflate = zlib.deflateSync(text);
  const gzip = zlib.gzipSync(text);
  //未压缩之前为800多kb
  //压缩之后为450B
  res.end(gzip);
}).listen(3000, () => {
  console.log('服务启动成功');
})