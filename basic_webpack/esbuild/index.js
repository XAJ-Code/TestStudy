import pack from './pack.js';
import '../gasp/style.css';
import { getSum } from '../webpack/sum.js'
pack();

console.log(getSum(1, 2));

