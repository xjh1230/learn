const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');

module.exports={
    entry:{
        'index':'./src/index.js',
    },
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'[name]-[contenthash:6].js'
    },
    mode:'development',
   
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[miniCssExtractPlugin.loader,'css-loader']
            }
            ,{
                test:/\.less$/,
                use:['my-style-loader','my-css-loader','my-less-loader']
            }
        ]
    },
    resolveLoader:{
        modules:['./node_modules','./myLoaders']
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            chunks:['index'],
        }),
        new CleanWebpackPlugin(),
        new miniCssExtractPlugin({
            filename:'css/index-[contenthash:6].css',
        })
    ]
}