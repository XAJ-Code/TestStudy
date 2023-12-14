// 引入ejs模块
import ejs from 'ejs';
import { Marked, marked } from 'marked';
import fs from 'node:fs';
import browserSync from 'browser-sync';
let browse;
/**
 * 打开浏览器同步服务
 */
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
/**
 * 初始化函数
 * @param {function} callBack - 回调函数
 */
const init = (callBack) => {
    // 读取markdown文件
    const RademeFile = fs.readFileSync('./markdown.md', 'utf-8')
    // 将markdown转化为html
    const htmlContent = marked.parse(RademeFile)
    // 编译模板字符串
    const templete1 = ejs.renderFile('./templete.ejs', { title: '我是用marked转化来的', content: htmlContent }, (err, str) => {
        if (err) {
            console.log(err);
            return;
        }
        // 创建可写流
        const writeStrem = fs.createWriteStream('./index.html', 'utf-8')
        // 写入文件
        writeStrem.write(str)
        // 关闭可写流
        writeStrem.close()
        // 监听可写流的finish事件
        writeStrem.on('finish', () => {
            console.log("写入完成");
            // openBrowser()
            // 执行回调函数
            callBack && callBack()
        })
    })
}
// 重新初始化并刷新浏览器同步服务
init(()=>{
    openBrowser()
});
// 监听markdown文件的修改事件
fs.watchFile('./markdown.md', (curr,prev) => {
    if(curr.mtime !== prev.mtime){
        // 重新初始化并刷新浏览器同步服务
        init(()=>{
            // 调用browse对象的reload方法刷新页面
            browse.reload()
        });
    }

})
