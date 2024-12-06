import pack from './pack.js';
import '../gasp/style.css';
import { getSum } from '../webpack/sum.js'
pack();

console.log(getSum(1, 2));

//动态导入--懒加载--才会分包chunks
import('../webpack/sum.js').then(module => {
  console.log(module.getSum(1, 2));
});

