const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');

module.exports = {
    entry: './src/js/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
    },

    output: {
        filename: 'bundle.umd.js',
        path: path.resolve(__dirname, 'dist', 'public')
    },

    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.svg$/, loader: 'svg-inline-loader' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: combineLoaders([{
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }])
                })
            },

        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]
};
