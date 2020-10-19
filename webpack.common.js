const path = require('path');

module.exports = {
    entry: {
        client: './src/client.js',
        admin: './src/admin.js'
    },
    module: {
        // Массив с правилами обработки тех или иных типов файлов
        rules: [
            {
                // На какие форматы файлов распространяется правило
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                },
                exclude: /(node_modules)/,
            },
        ]
    }
}
