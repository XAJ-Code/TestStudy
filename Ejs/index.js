// 引入ejs模块
import ejs from 'ejs';
import { Marked, marked } from 'marked';
import fs from 'node:fs';
import browserSync from 'browser-sync';
let browse;
const openBrowser = () => {
    browse = browserSync.create()
    browse.init({
        server: {
            baseDir: './',
            index: './index.html'
        }
    })
    return browse;
}
// 编译模板字符串
// const template = ejs.compile('Hello <%=name %>')
const init = (callBack) => {
    const RademeFile = fs.readFileSync('./markdown.md', 'utf-8')
    const htmlContent = marked.parse(RademeFile)
    const templete1 = ejs.renderFile('./templete.ejs', { title: '我是用marked转化来的', content: htmlContent }, (err, str) => {
        if (err) {
            console.log(err);
            return;
        }
        const writeStrem = fs.createWriteStream('./index.html', 'utf-8')
        writeStrem.write(str)
        writeStrem.close()
        writeStrem.on('finish', () => {
            console.log("写入完成");
            // openBrowser()
            callBack && callBack()
        })
    })
}
init(()=>{
    openBrowser()
});
fs.watchFile('./markdown.md', (curr,prev) => {
    if(curr.mtime !== prev.mtime){
        // console.log(curr,prev);
        init(()=>{
            browse.reload()
        });
    }
})