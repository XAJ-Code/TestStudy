import postCss from 'postcss';
import autoprefixer from 'autoprefixer';
import fs from "node:fs";
import postCssEnv from 'postcss-preset-env';
const css = fs.readFileSync('./index.css','utf-8')
//原理和babel一样的:先转换为ast抽象语法树-在进行transform-最后generted来生成
//postcss他只是一个工具,提供这个过程具体需要我们怎么转换，需要在transform阶段来配合其他插件等配置

postCss([postCssEnv({browsers:'last 2 versions'}),autoprefixer]).process(css,{
    from:'./index.css', // 源文件路径，可以省略，默认当前工作目录
}).then((result)=>{
    console.log(result.css);
})
// postCss().process