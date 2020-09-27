const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const manifestWebpackPlugin = require('./myPlugins/manifestPlugin.js')
const webpack = require("webpack");
const path = require('path');


const glob = require('glob')
const getEntry = () => {
    //等价交换，炼金术不变的原则
    const entry = {}
    const htmlWebpackPlugins = []
    const files = glob.sync(path.join(__dirname, './src/*/index.js'))
    files.map((item, index) => {
        const match = item.match(/src\/(.*)\/index\.js/)
        if (match) {
            const pageName = match[1]
            entry[pageName] = item
            htmlWebpackPlugins.push(new htmlWebpackPlugin({
                template: path.join(__dirname, `./src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName]
            }))
        }
    })
    return { entry, htmlWebpackPlugins }

}


const { entry, htmlWebpackPlugins } = getEntry();

module.exports = {
    entry: {
        'home': './src/index.js',
    },
    // entry,
    output: {
        path: path.resolve(__dirname, './dist'),
        // filename: '[name]-[contenthash:6].js'
        filename: this.mode === 'production' ? '[name].[contenthash:10].js' : 'js/[name].[hash:10].js',
    },
    mode: 'development',
    resolveLoader: {
        modules: ['./node_modules', './myLoaders']
    },
    module: {
        rules: [{
                test: /\.less$/,
                use: ['my-style-loader', 'my-css-loader', 'my-less-loader']
            }, {
                test: /\.css$/,
                use: [miniCssExtractPlugin.loader, 'css-loader']
            }, {
                test: /\.woff2?$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name]-[hash].[ext]',
                        outputPath: 'font/',
                        publicPath: '../font/',
                    }
                }
            }
            // , {
            //     test: /\.js$/,
            //     use: 'babel-loader'
            // }
        ]
    },

    plugins: [
        // ...htmlWebpackPlugins,
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["home"],
        }),
        new CleanWebpackPlugin(),
        new miniCssExtractPlugin({
            filename: 'css/index-[contenthash:6].css',
        }),
        new manifestWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        open: true, //自动打开浏览器
        port: '8090',
        hot: true,
        // hotOnly: true
    }
}