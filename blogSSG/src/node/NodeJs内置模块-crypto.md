# NodeJs内置模块-crypto
### 第一部分介绍一个库pngQuant
  pngquant 是一个用于压缩 PNG 图像文件的工具。它可以显著减小 PNG 文件的大小，同时保持图像质量和透明度。通过减小文件大小，可以提高网页加载速度，并节省存储空间。pngquant 提供命令行接口和库，可轻松集成到各种应用程序和脚本中。
  [pngquant官网](http://pngquant.com/)
### 概念
  crypto是用来加密的，再JavaScript中像一些库md5等，nodejs底层的libuiv层是通过c/c++来实现的，所以这个模块是node底层封装后暴露给js去调用的，这样运行速度会非常快，提高效率。
  ```javascript
const crypto = require('node:crypto')// 引入模块

//接受三个参数
//第一个参数：算法名称
//第二个参数：key
//第三个参数：iv-初始化向量---保证每一个生成的密文都是不一样的

const key = crypto.randomBytes(32)//生成一个随机的 32 字节的密钥
const iv = Buffer.from(crypto.randomBytes(16))//生成一个随机的 16 字节的初始化向量 (IV)

const Cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

// 对输入数据进行加密，并输出加密结果的十六进制表示
Cipher.update("小阿俊", "utf-8", "hex");
const result = Cipher.final("hex");

console.log(result);//0b90c429da8c344528f6982269b225dc

//解密-用相同的key和相同的iv去解密
const de = crypto.createDecipheriv('aes-256-cbc', key, iv)
de.update(result, 'hex', 'utf-8')
console.log(de.final().toString('utf-8'));//小阿俊
  ```
### 哈希函数--常用的MD5加密、SHA-256
  特点：
* 输出的长度固定，不管输入大小
* 不可逆的，只能加密，无法解密
* 唯一性，只要算法相同，永远加密得到的串都是一样的
```javascript
//解密-用相同的key和相同的iv去解密
const de = crypto.createDecipheriv('aes-256-cbc', key, iv)
de.update(result, 'hex', 'utf-8')
console.log(de.final().toString('utf-8'));//小阿俊


//哈希函数
let hash = crypto.createHash('md5')
hash.update('123456')
//以十六进制输出
console.log(hash.digest().toString('hex')); //e10adc3949ba59abbe56e057f20f883e
```