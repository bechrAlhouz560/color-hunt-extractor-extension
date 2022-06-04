const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
exports.default = {
    mode: "production",

    entry: {
        index : "./src/index.js",
        background : "./src/background.js"
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: "popup.html",
        chunks : ['index']

    })],
}