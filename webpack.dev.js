const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

exports = module.exports = merge.smart(baseConfig, {
    mode: 'development',
    entry: ['./src/dev-entry'],
    output: {
        publicPath: '/',
    },
    plugins: [
        new UglifyJsPlugin({
            include: /\/src/,
            exclude: /\/node_modules/,
            uglifyOptions: {
                ecma: 5,
                sourceMap: false,
                beautify: false,
                warnings: false
            }
        }),
        new VueLoaderPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/template/index.html'
        })
    ],
    devtool: 'source-map',
    devServer: {
        host: 'localhost',
        contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true  // only errors & warns on hot reload
    }
});