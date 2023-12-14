const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'/',
  outputDir:'dist',
  assetsDir:'static'
  lintOnSave:false,
  configureWebpack:{
    name:'卧槽',
    resolve:{
      alias:{
        '@':path
      }
    }
  }
  chainWebpack:config=>{
    // console.log(config.module);
  }
});
