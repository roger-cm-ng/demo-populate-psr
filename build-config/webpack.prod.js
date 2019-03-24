const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const CommonConfig = require('./webpack.common');

module.exports = webpackMerge(CommonConfig, {
    output: {
        path: path.resolve('public/bundles'),
        filename: '[name].js',
        publicPath: '/',
        jsonpFunction: 'DUCSChunkJSONPLoader'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: './sourcemaps/[name].js.map'
        })
    ]
});
