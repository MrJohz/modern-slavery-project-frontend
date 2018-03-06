const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');

process.traceDeprecation = true;

module.exports = {
    entry: {
        app: './src/js/index.tsx',
        vendor: Object.keys(require('./package').dependencies).filter(dep => dep !== 'flag-icon-css'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
    },

    output: {
        filename: 'public/[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            {
                test: /\.svg$/, loader: 'svg-inline-loader',
                query: { removeSVGTagAttrs: false },
            },
            {
                test: /\.css|.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: combineLoaders([{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            importLoaders: 1,
                        }
                    }, {
                        loader: 'sass-loader',
                    }])
                })
            },

        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity }),
    ]
}
;
