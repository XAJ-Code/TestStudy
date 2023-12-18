const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        index: './src/index.js',
    },//配置多入口，默认为main
    output: {
        /**
         * contenthash或者chunkhash或者fullhash
         * 老写法hash:6
         */
        filename: "static/js/[name].bundle[fullhash].js",
        path: resolve(__dirname, './dist'),
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',//这样的配置可以确保生成一个单独的 runtime 文件，
        //所有的入口点共享该文件，从而避免了每个入口点都生成自己的运行时代码，减小了文件体积并提高了缓存效率。
        splitChunks: {
            //chunks: 'all',//这个属性会把所有的公共依赖提出来单独打包为一个模块，//一般也不用这个
            cacheGroups: {
                my: {
                    test: /\.js$/,
                    name: 'my',
                    chunks: 'all'
                },
                loadsh: {
                    test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                    name: 'loadsh',
                    chunks: 'all',
                    priority: 5,//优先级
                    // filename:'static/js/loadsh.bundle[fullhash].js'
                },
                jQuery: {
                    test: /[\\/]node_modules[\\/](jquery)[\\/]/,
                    name: 'jQuery',
                    /**
                     * chunks--三个选项
                     * 1、all---表示将公共依赖模块提取单独打包为一个文件，不管你在哪里引用或者引用几次
                     * 2、initial---表示公共依赖模块提取到**初始入口点**代码块中,针对初始入口点,将公共依赖模块提取到这些入口点所在的代码块中
                     * 3、async---也是用于提取公共依赖模块，但它的作用范围仅限于**异步加载**的代码块
                     * 也就是import('./path/to/module').then(module => {})
                     */
                    chunks: 'all',
                    priority: 6,//优先级---越高优先匹配
                    filename:'static/js/[name].js',//可以在分包的地方加上filename会覆盖上面配置的output
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'chunk-libs',
                    chunks: 'all',
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
                    filename: 'static/img/[name]_[contenthash][ext]'
                },
                parser: {
                    //配置多大尺寸的转为base64，也就是url格式
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb
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
        filename: 'static/css/[name]_[contenthash].css'
    })
    ],
}