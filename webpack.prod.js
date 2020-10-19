const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: 'js/bundle.[name].[hash].js',
        path: path.resolve(__dirname, 'public'),
    },
    mode: 'production',
    stats: {
        colors: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true // Убрать все консоль.логи с прода
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all'
                },
            }
        }
    },

    module: {
        rules: [
            {
                /*
                    Если мы хотим добавить возможность обрабатывать и другие типы данных, таких как стили например.
                    Нам понадобиться возможность выделить их в отдельный файл.
                    Для этого нам понадобиться специальный плагин MiniCssExtractPlugin.

                    Теперь мы используем правило use для того что бы указать какой loader мы хотим использовать.

                */
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            /*
                Лоудеры - подпрограммы которые позволяют вебпаку обрабатывать не только js файлы но и другие.
                Также расширяют функционал и добавляют специфическую обработку для этого типа файлов
            */
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader, // 3. Экстрактит в отдельный файл
                    'css-loader', // 2. Трансформирует css в js модуль
                    'sass-loader' // 1. Трансформирует sass -> css
                ]
            },
            /*
                html-loader - Позволяет парсить подключенные к сборке HTML файлы,
                а соответственно вытягивать и обрабатывать ассеты с них.
            */
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[hash].css",
            chunkFilename: './css/vendor.[hash].css'
        }),
        new HTMLWebpackPlugin({
            title: "Client HTML",
            filename: 'client.html',
            template: './src/assets/client.html',
            inject: 'body',
            chunks: [
                'client', 'vendors'
            ]
        }),
        new HTMLWebpackPlugin({
            title: "Admin HTML",
            filename: 'admin.html',
            template: './src/assets/admin.html',
            inject: true,
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

