var path = require('path');
var webpack = require('webpack');
var validate = require('webpack-validator');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var PATHS = {
    publicPath:'/html-css3-drawing-CR7/dist/',
    srcPath: path.resolve(process.cwd(), './src'),
    node_modulesPath: path.resolve('./node_modules')
}

var resolve = {
    extensions: ['', '.js', '.css'],
    root: [
        PATHS.node_modulesPath
    ],
    alias: {
        indexcss: path.join(PATHS.srcPath, "css/cr7.css")
    }
}

var entry = {
    index: './src/index.js'
};

var output = {
    path: path.join(__dirname, 'dist'),
    publicPath: PATHS.publicPath
}

var loaders = [   
    {
        test: /\.js$/,
        loader: 'babel'
    },
    {
        test: /\.html$/,
        loader: "html"
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
    }
];

var plugins = [
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: __dirname + '/src/index.html',
        inject: 'true',
    }),
    new webpack.HotModuleReplacementPlugin({
        multiStep: true
    }),
    new OpenBrowserPlugin({url: 'http://localhost:8080' + PATHS.publicPath + 'index.html'})
];

var config = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: 'errors-only',
        host: "localhost", 
        port: "8080"       
    },
    entry: entry,
    resolveLoader: {root: path.join(__dirname, "node_modules")},
    output: output,
    module: {
        loaders: loaders
    },
    resolve: resolve,
    plugins: plugins
}
module.exports = validate(config);






