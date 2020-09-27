const config = require('./webpack.config.js')
const webpack = require('./lib/webpack')
const fs = require('fs')

// var s = fs.readFileSync('./src\\a.js', 'utf-8')
// console.log(s)


new webpack(config).run()