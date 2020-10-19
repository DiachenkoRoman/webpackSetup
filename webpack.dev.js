const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: 'bundle.[name].[hash].js',
        path: path.resolve(__dirname, 'public'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8080,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.(svg|jpe?g|gif|png)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "images",
                        publicPath: 'images',
                    }
                }
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: "Client HTML",
            filename: 'index.html',
            template: './src/assets/client.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: [
                'client', 'vendors'
            ]
        }),
        new HTMLWebpackPlugin({
            title: "Admin HTML",
            filename: 'admin.html',
            template: './src/assets/admin.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: [
                'admin', 'vendors'
            ]
        })
    ]
});

