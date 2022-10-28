'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
//delete require.cache[require.resolve('./webpack.base.conf')];
let baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
delete require.cache[require.resolve('../package.json')];
let packageJson = require("../package.json");
let { publicPath, webVersion, website, favicon } = packageJson.config;
const env = 'test'
if(['SSO','expert','usercenter','pskin3','mnskin','nskin'].indexOf(website)!=-1){
    publicPath = publicPath.indexOf('https:')==-1?publicPath.replace("http","https"):publicPath
}

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    // devtool: 'none', //config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: path.join(config.build.assetsRoot,website),
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        publicPath: `${publicPath}${process.env.NODE_ENV}/${webVersion}/${website}/`
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: {
                        drop_console: process.env.NODE_ENV!='test',
                    }
                }
            })
        ]

    },

    plugins: [
        // https://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'COOKIE_SUFFIX': JSON.stringify('-cctest'),
        }),
        // extract css into its own file
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: utils.assetsPath('css/[chunkhash].[name].css'),
            chunkFilename: utils.assetsPath('css/[chunkhash].[id].css'),
        }),

        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: `${website}.html`,
            template: `public/${website}/index.html`,
            favicon: `public/${website}/favicon.ico`,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.ids.HashedModuleIdsPlugin(),

        // new CopyWebpackPlugin({patterns:[{
        //     from: path.resolve(__dirname, '../static'),
        //     to: config.build.assetsSubDirectory,
        //     globOptions:{
        //         ignore: ['.*']
        //       }
        // }]})
    ],
    target:['web','es5'],
})
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig