const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const resolveClientEnv = require("./resolveClientEnv");
// resolveClientEnv();
module.exports = {
    entry: path.resolve(__dirname, "./main.js"),
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./dist")
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        open: true,
        port: 8090,
        hot: true
    },
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif)/,
            use: {
                loader: "file-loader",
                options: {
                    outputPath: "assests/",
                    publicPath: "",
                }
            }
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["main"],
        }),
        new webpack.DefinePlugin({
            'process.env': resolveClientEnv()
        })
    ]
}