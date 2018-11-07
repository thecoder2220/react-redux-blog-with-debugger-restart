var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var hostname = '0.0.0.0' ;
var port = 10080;

module.exports = {
    entry: [
        `webpack-dev-server/client?http://${hostname}:${port}`,

        './src/index.jsx'
    ],
    output: {
        path: path.resolve('dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
    })],
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        hostname: hostname,
        port: port
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8000'
        })
    }
}
