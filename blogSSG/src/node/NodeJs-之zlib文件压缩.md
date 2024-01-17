# NodeJs使用zlib文件压缩
在 Node.js 中，zlib 模块提供了对数据压缩和解压缩的功能，以便在应用程序中减少数据的传输大小和提高性能。该模块支持多种压缩算法，常用的有 Deflate、Gzip 和 Raw Deflate。
## 0. gzip 和 deflate 区别
1. 压缩算法：Gzip 使用的压缩算法结合了 LZ77 算法和哈夫曼编码。LZ77 算法用于数据的重复字符串的替换和引用，而哈夫曼编码用于进一步压缩数据。
2. 压缩效率：Gzip 压缩通常具有更高的压缩率，因为它使用了哈夫曼编码来进一步压缩数据。哈夫曼编码根据字符的出现频率，将较常见的字符用较短的编码表示，从而减小数据的大小。
3. 压缩速度：相比于仅使用 Deflate 的方式，Gzip 压缩需要更多的计算和处理时间，在压缩速度方面，Deflate 可能比 Gzip 更快。
4. 应用场景：Gzip 压缩常用于文件压缩、网络传输和 HTTP 响应的内容编码。它广泛应用于 Web 服务器和浏览器之间的数据传输，以减小文件大小和提高网络传输效率。
## 1. 简介
1. 数据压缩：使用 zlib 模块可以将数据以无损压缩算法（如 Deflate、Gzip）进行压缩，减少数据的大小。这在网络传输和磁盘存储中特别有用，可以节省带宽和存储空间。
2. 数据解压缩：zlib 模块还提供了对压缩数据的解压缩功能，可以还原压缩前的原始数据。
3. 流压缩：zlib 模块支持使用流（Stream）的方式进行数据的压缩和解压缩。这种方式使得可以对大型文件或网络数据流进行逐步处理，而不需要将整个数据加载到内存中。
4. 压缩格式支持：zlib 模块支持多种常见的压缩格式，如 Gzip 和 Deflate。这些格式在各种应用场景中广泛使用，例如 HTTP 响应的内容编码、文件压缩和解压缩等。

- Node.js 内置了 zlib 模块，用于在 Node.js 中压缩和解压文件。
- 代码实现
```javaScript
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
  //调用createGzip拿到压缩后的值---gzip算法
    const gzipInfo = zlib.createGzip({ info: true });
  //调用createDeflated拿到压缩后的值---deflate算法
  // const gzipInfo = zlib.createDeflate({ info: true });
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

//解压----gunzip算法或者createInflate
function gunzip (path, callback) {
  //创建读取流
  const readStream = fs.createReadStream(path);
  //创建写入流
  const writeStream = fs.createWriteStream(path + '.txt');
  //创建gunzip流--解压gzip
  const gunzipStream = zlib.createGunzip()
  //创建createInflate流--解压deflate
  // const gunzipStream = zlib.createInflate()
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
gunzip('./index.txt.gz')
```

## 2. http 响应内容压缩
```javaScript
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
```