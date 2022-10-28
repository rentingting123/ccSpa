'use strict'
require('./check-versions')()
const _ = require("lodash")
const ora = require('ora')
const path = require('path')
const fs = require("fs")
const packageJson = path.resolve(__dirname, "../package.json")
const packageConfig = require('../package.json')
const spinner = ora(`${process.env.NODE_ENV == 'test' ? 'building for test...' : 'building for production...'}`)
const child_process = require("child_process");
async function packAll(arr) {
    let newConfig = packageConfig['config']
    while (arr.length > 0) {
        console.log('arr', arr)
        newConfig.website = arr.shift()
        let newPackageJson = _.merge({}, packageConfig, { config: newConfig });
        fs.writeFileSync(packageJson, JSON.stringify(newPackageJson), 'utf8')

        await pack()
    }
}

async function pack() {
    console.log('packStart')
    spinner.start()
    return new Promise((ref, rej) => {
        let packSpawn = child_process.spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm',['run', 'build'])
        packSpawn.on("close", code => {
            spinner.stop()
            ref();
          });
          packSpawn.on("error", err => {
            rej(err);
          });
    })
}

packAll(_.cloneDeep(packageConfig['config'].packApps))