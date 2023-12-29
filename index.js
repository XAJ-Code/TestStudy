const worker = new Worker('worker.js');
worker.onmessage = function (e) {
    console.log(e.data);
};
worker.postMessage('Hello World!');

//写一个函数,控制并发请求，使用异步Promise
