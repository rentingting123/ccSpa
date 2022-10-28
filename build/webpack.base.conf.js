'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
,MiniCssExtractPlugin = require('mini-css-extract-plugin')
delete require.cache[require.resolve('../package.json')];
let packageJson = require('../package.json')
let { website } = packageJson.config;

const { VueLoaderPlugin } = require('vue-loader')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


function getEntry() {
    console.log('开始打包：',website)
    let entry = {}
        //let website = process.env.WEBSITE ? process.env.WEBSITE : 'skin'//webpack 打包默认项目
    entry.app = ['@babel/polyfill', `./src/${website}/main.js`]
    return entry
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: getEntry(),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname,'../src'),
            '@@': path.resolve(__dirname,'../../competition/src')
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
                //include: [resolve('src'), resolve('../competition/src')]
            },
            {
                test: /\.scss$/,
                use: [
                MiniCssExtractPlugin.loader,
                  "css-loader",
                  "less-loader"
                ]
              },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname,'../src'),
                path.resolve(__dirname,'../../competition/src'),
                path.resolve(__dirname,'../test'),
                path.resolve(__dirname,'../node_modules/webpack-dev-server/client')],
                options: {
                    presets: ['@babel/preset-env',"@vue/babel-preset-jsx"],
                    plugins: ['@babel/plugin-transform-runtime',]
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                    esModule: false
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ],
    node: false
}
