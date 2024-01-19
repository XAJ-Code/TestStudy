//配置项
module.exports = {
    server:{
        proxy:{
            '/api':{
                target:'http://localhost:8888', // 代理目标地址，这里以http://localhost:3000为例，
                changeOrigin:true, // 是否改变域名，设置为true，表示改变域名，
                pathRewrite:{
                    '^/api':'' // 路径重写，将/api替换为空字符串
                }
            },
            //可以多个
            // '/foo':{
            //     target:'http://localhost:4000', // 代理目标地址，这里以http://localhost:4000为例，
            //     changeOrigin:true, // 是否改变域名，设置为true，表示改变域名，
            // }
        }
    }
}