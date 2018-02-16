var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: ['./src/App.js'],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    output: {
        path: __dirname,
        filename: 'dst/bundle.js'
    },
    plugins: [

    ],
    module: {

        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(js|jsx)$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    plugins: [
                        [
                            "babel-plugin-transform-builtin-extend", {
                                globals: ["Error", "Array"]
                            }
                        ]
                    ],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            },
            {
                test: /\.less$/,
                use: [{
                        loader: "style-loader",
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            url: false
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader'
            }
        ]
    }
};