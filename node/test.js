const fs = require('node:fs');
fs.writeFileSync('./test/test.txt', 'Hello World!', 'utf8');
fs.readFile('./test/test.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // console.log(data);
});

// 分配一个10字节的缓冲区
const buf = Buffer.alloc(10);
// console.log(buf.length);
// const buf1 = Buffer.from();
// console.log(buf1);
const path = require('path');
console.log(path.resolve(__dirname,'./test/test.txt'));

const EventsEmitter = require('events');
const emitter = new EventsEmitter();
emitter.setMaxListeners(20)
emitter.on('你还哦', (data) =>{
    console.log(data);
})
setTimeout(()=>{
    emitter.emit('你还哦', 'Hello World!');
},2000)

