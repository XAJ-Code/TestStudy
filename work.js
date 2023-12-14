
self.onmessage = function (e) {
    var data = e.data;
    console.log(data);
}

//计算1到100000的和
let beginTime = new Date().getTime();
let sum = 0;
for(let i=1;i<=1000000000;i++){
    sum+=i;
}
let endTime = new Date().getTime();
const totalTime = endTime - beginTime;
const miao = Math.floor(totalTime / 1000);
self.postMessage(`我计算的和：${sum},共耗时${miao}秒`);