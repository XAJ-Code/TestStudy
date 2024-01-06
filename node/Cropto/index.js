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


//哈希函数
let hash = crypto.createHash('md5')
hash.update('123456')
//以十六进制输出
console.log(hash.digest().toString('hex')); //e10adc3949ba59abbe56e057f20f883e