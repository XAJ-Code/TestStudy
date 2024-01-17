const worker = new Worker('worker.js');
worker.onmessage = function (e) {
    console.log(e.data);
};
worker.postMessage('Hello World!');

//写一个函数,控制并发请求，使用异步Promise
// function limitRequest(urls, limit) {
//   const requests = urls.map(url => fetch(url));
//   const limitedRequests = [];
  
//   let runningCount = 0;
//   const executeNext = () => {
//     if (runningCount < limit && requests.length > 0) {
//       const promise = requests.shift();
//       runningCount++;
//       promise.then(response => response.json())
//         .then(data => {
//           runningCount--;
//           limitedRequests.push(data);
//           executeNext();
//         }
//             )
//         }
//     }
// }
