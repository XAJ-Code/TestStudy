const fn = function(){
    console.log('我是bbb.js里面的函数')
}
import {sum} from './aaa'
console.log(sum(1,2));
module.exports={
fn
}