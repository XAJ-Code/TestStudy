# vite原理基础知识
 
## 什么是构建工具
  - 构建工具就是将源码转换成浏览器可以识别的代码，例如：
    - 将es6的语法转换成es5的语法
    - 将ts转换成js
    - 将vue文件转换成js文件
  - 构建工具的种类有很多，例如：webpack、vite、rollup、gulp等
  - create-vite就是vite的脚手架,类似于vue-cli，它已经集成了一些适用于打包的转换的插件(babel、postcss、typescript等),不需要我们一个个安装,这就叫做预设

## 1. vite的开发服务器

# vite在开发环境下的工作原理
 -利用esbuild预构建依赖---解决了三个痛点问题：
 1. 不同的第三方依赖，会有不同的导出格式,vite在启动的时候(vite dev),查找导入的依赖，将路径补全，给浏览器识别，因为浏览器本身是不知道node_modules的，所以需要vite来补全路径
 ```javaScript
 import _ from 'lodash'
 ```
 vite转化后
 ```javaScript
 // 路径补全
 import _ from '/node_modules/.vite/deps/lodash.js?v=f321d958'
 ```
2. 网络多包传输性能问题(也就是原生esModule不敢支持node_modules的原因之一),vite就解决了这个问题，它利用esbuild预构建依赖，将第三方**依赖打包成一个文件**，这样就只需要传输一个文件，而不是多个文件，大大提高了传输效率
- 那它是怎么知道哪些依赖需要打包成一个文件呢?
  - 在开发环境下，vite会根据项目中的import语句，自动推断出哪些依赖需要打包成一个文件，然后利用esbuild预构建依赖，将这些依赖打包成一个文件，这样就只需要传输一个文件，而不是多个文件，大大提高了传输效率
  - 例如：
  ```javaScript
  import lodash-es from 'lodash-es'
  //lodash-es源码中是存在很多导出模块的，例如：
  export * from './cloneDeep.js'
  export * from './isEqual.js'
  export * from './isPlainObject.js'
  // 这种导出模块的方式，在vite中被称为"ES模块格式"
  ```
  经过vite转换后
  ```javaScript
  //他直接会把lodash-es打包成一个文件，这样就只需要传输一个文件，而不是多个文件，大大提高了传输效率，
  //把你引入的源码直接拿过来，而不是import的形式
  function cloneDeep(){}
  function isEqual(){}
  function isPlainObject(){}
  ```
3. 在vite.config.js中，依赖预构建就是指的esbuild预构建依赖
```javaScript
import { defineConfig } from 'vite'
export default defineConfig({
  optimizeDeps: {
    // 指定需要预构建的依赖
    include: ['lodash-es'],
    // 指定不需要预构建的依赖
    exclude: ['lodash']
  }
})
```
