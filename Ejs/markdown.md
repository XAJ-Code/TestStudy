### 1. 概述
* [EJS](https://ejs.bootcss.com/#promo)
* 高嵌入式的JavaScript模板引擎
```javsScript
var ejs = require('ejs');
// 编译模板
var html = ejs.render(template, data);
// 直接输出
res.end(html);
// 或者写入文件
fs.writeFileSync('./index.html', html);
```
### 2. 语法
#### Marked---Markdown解析器和编译器
* [Marked](https://marked.js.org/)
* 将Markdown转换为HTML
* 一个流行的Markdown解析器和编译器，它可以将Markdown语法转换为HTML标记。Marked是一个功能强大且易于使用的库，它为您提供了丰富的选项和扩展功能，以满足各种转换需求。
#### BrowserSync--一个强大的开发工具，它可以帮助您实时预览和同步您的网页更改。当您对Markdown文件进行编辑并将其转换为HTML时，BrowserSync可以自动刷新您的浏览器，使您能够即时查看转换后的结果。
* [BrowserSync](https://browsersync.io/docs)
* 在浏览器中实时预览和同步您的网页更改
* 会在本地开启一个服务