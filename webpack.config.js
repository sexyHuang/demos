const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './src/index.js', //入口文件，src下的index.js
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'), // 出口目录，dist文件
        filename: '[name].[hash].js' //这里name就是打包出来的文件名，因为是单入口，就是main，多入口下回分解
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader' //js编译 依赖.babelrc
            },
            {
                test: /\.css$/,
                use: ['postcss-loader','style-loader', 'css-loader'],
                include: path.join(__dirname, 'src'), //限制范围，提高打包速度
                exclude: /node_modules/
            },
            /* {
                test: /\.css$/, // 转换文件的匹配正则
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader']
                })
            }, */
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                  loader: 'url-loader',
                  options: {
                    outputPath: 'images/', // 图片输出的路径
                    limit: 5 * 1024
                  }
                }
            }
            /* {
                test: /\.css$/, // 转换文件的匹配正则
                // css-loader用来处理css中url的路径
                // style-loader可以把css文件变成style标签插入head中
                // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
                // 此插件先用css-loader处理一下css文件
                use: ExtractTextWebpackPlugin.extract({
                  fallback: 'style-loader',
                  //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                  use: ['css-loader', 'postcss-loader']
                })
            }, */
        ]

    },
    watch: true,
    watchOptions: { //不监听目录
        ignored: [/node_modules/ , '/static/']
    },
    devtool: '#source-map',
    plugins: [
        
        new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
       /*  new ExtractTextWebpackPlugin({
            filename: 'css/[name].[hash].css' //放到dist/css/下
        }), */
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname , './dist/index.html'),
            template: path.resolve(__dirname , './src/index.html')
        }),
        new Webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(process.env.NODE_ENV)
        }),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, 'static'),
              to: path.resolve(__dirname, './dist/static'),
              ignore: ['.*']
            }
          ])
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"), //静态文件根目录
        port: 9090, // 端口
        host: '0.0.0.0',
        overlay: true,
        compress: true // 服务器返回浏览器的时候是否启动gzip压缩
    },
    resolve: {
        //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
        extensions: ['*', '.js', '.json', '.css']
    }
}

