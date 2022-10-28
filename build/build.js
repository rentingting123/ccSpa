'use strict'
require('./check-versions')()
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(`${process.env.NODE_ENV == 'test' ? 'building for test...' : 'building for production...'}`)
console.log('packStart')
let webpackConfig = require('./webpack.prod.conf')
let webackCT = require('./webpack.test.conf')
let webpack = require('webpack')
spinner.start()
return new Promise((ref, rej) => {
    let configWebpack = process.env.NODE_ENV == 'production' ? webpackConfig : webackCT
    webpack(configWebpack, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')
        if (stats.hasErrors()) {
            rej()
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }
        ref()
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })

})


