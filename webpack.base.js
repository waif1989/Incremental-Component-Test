const path = require('path');

const webpackBaseConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'es2015',
                                {
                                    'modules': false
                                }
                            ]
                        ],
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'es2015',
                                {
                                    'modules': false
                                }
                            ],
                            'react'
                        ],
                    }
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: [
                                {
                                    loader: 'vue-style-loader'
                                },
                                {
                                    loader: 'css-loader'
                                },
                                {
                                    loader: 'sass-loader'
                                }
                            ],
                            less: [
                                {
                                    loader: 'vue-style-loader'
                                },
                                {
                                    loader: 'css-loader'
                                },
                                {
                                    loader: 'less-loader'
                                }
                            ]
                        }
                    }
                }
            },
            {
                test: /\.(less$|css$)/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
	        'baseCom': path.resolve('', 'src/incra-comp-base/index.js'),
            'demo': path.resolve('', 'src/incramental-component/index.js'),
	        'demo2': path.resolve('', 'src/incramental-component2/index.js'),
	        'demo3': path.resolve('', 'src/incramental-component3/index.js')
        }
    },
    context: __dirname
};

exports =module.exports = webpackBaseConfig;