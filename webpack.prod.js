const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const baseConfig = require('./webpack.base');

exports = module.exports = merge.smart(baseConfig, {
    mode: 'production',
    entry: ['./src/build-entry'],
    output: {
        publicPath: './',
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        },
        'vue-router': 'VueRouter',
        'lodash':'lodash',
        'vuex':'vuex',
        'axios':'axios'
    },
    plugins: [
        new UglifyJsPlugin({
            include: /\/src/,
            exclude: /\/node_modules/,
            uglifyOptions: {
                ecma: 5,
                sourceMap: false,
                beautify: false,
                warnings: false,
                sourceMap: false,
                compress: {
                    drop_console: true,
                    pure_funcs: ['console.log']
                }
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js'
        }
    }
});