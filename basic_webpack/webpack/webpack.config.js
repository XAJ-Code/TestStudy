const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        index: './src/index.js'
    },//配置多入口，默认为main
    output: {
        filename: "static/js/[name].bundle.js",
        path: resolve(__dirname, './build'),
        clean: true,
    },
    optimization: {
        //runtimeChunk: 'single',//这是使用多入口打包是，把公共的依赖提出来
        splitChunks: {
            //chunks: 'all',//这个属性会把所有的公共依赖提出来单独打包为一个模块，//一般也不用这个
            cacheGroups: {
                my:{
                    test:/\.js$/,
                    name:'my',
                    chunks:'all'
                },
                loadsh: {
                    test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                    name: 'loadsh',
                    chunks: 'all',
                    priority: 5,//优先级
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'chunk-libs',
                    chunks: 'initial',
                    priority: 4,//优先级
                    reuseExistingChunk: true
                    // name: 'commons',
                    // chunks: 'initial',
                    // minChunks: 2,
                },
            },
        },
    },
    devServer: {
        static: './dist',
        port: 8888
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // { loader: 'style-loader' },
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['postcss-preset-env', {}, 'autoprefixer', {}]
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    //配置静态资源输出目录以及文件名
                    filename: 'static/img/[name]_[hash:8][ext]'
                },
                parser: {
                    //配置多大尺寸的转为base64，也就是url格式
                    dataUrlCondition: {
                        maxSize: 500 * 1024 // 10kb
                    }
                }
            },
        ],
        parser: {}
    },
    plugins: [new HtmlWebpackPlugin({
        title: "我自顶顶顶"
    }),
    new MiniCssExtractPlugin({
        filename:'static/css/[name]_[hash:8].css'
    })
    ],
}