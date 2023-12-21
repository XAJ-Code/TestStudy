
const fs  = require('node:fs');
const { Buffer } = require('node:buffer')

const buf1 = Buffer.alloc(5)
console.log(buf1)//<Buffer 00 00 00 00 00>.五个字节长度的buffer类数组
buf1.write('a')
buf1.write('b',1,'utf-8')
console.log(buf1)

//buffer是一个二进制缓冲区

fs.readFile('../../../../../../code/若依/RuoYi-App/static/images/profile.jpg',(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data.slice(0,50))
        // console.log(data.toString('base64'))
    }
})