const worker = new Worker('worker.js');
worker.onmessage = function(e) {
    console.log(e.data);
};
worker.postMessage('Hello World!');