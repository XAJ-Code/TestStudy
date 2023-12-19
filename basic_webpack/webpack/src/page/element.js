import '../css/style.css'
import tupian from '../assets/img/work.png'
import {sum} from './aaa'
const divEl = document.createElement('div')
import _ from "lodash";
import $ from 'jquery'
divEl.className='title',
divEl.innerHTML = '你好，webpack',
document.body.appendChild(divEl)
const imgEl = document.createElement('img')
imgEl.src=tupian
document.body.appendChild(imgEl)
console.log(`output->`,sum(1,2))