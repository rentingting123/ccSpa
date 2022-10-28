var config = require('./webpack.base.conf')
  , webpack = require('webpack')
  ,utils = require('./utils')
  ,uconfig = require('../config')
  , path = require('path')
  , {CleanWebpackPlugin} = require('clean-webpack-plugin')
  //,  MiniCssExtractPlugin = require('mini-css-extract-plugin')
  , _ = require('lodash');
  config.module.rules=config.module.rules.concat(utils.styleLoaders({ sourceMap: uconfig.dev.cssSourceMap, usePostCSS: true }))
  let compiler = webpack({
    mode:"development",
    output: {
      path:path.resolve(__dirname, '../static/dll'),
      filename: '[name].js',
      library: '[name]_library',
    },
    entry: {
      "lib": [path.resolve(__dirname, './dll', 'dll.config.js')]
    },
    plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'COOKIE_SUFFIX': JSON.stringify('-dev')
    }),
      new webpack.DllPlugin({
        path: path.resolve(__dirname, './dll', 'manifest.json'),
        name: '[name]_library',
        context: path.resolve(__dirname, '../'),
      }),
      //new  MiniCssExtractPlugin('[name].css'),
    ],
    resolve: _.merge({}, config.resolve),
    module: _.merge({}, config.module)
  });
  compiler.run((err, state) => {
    if (err) {
    } else {
      console.log('success')
    }
  });
