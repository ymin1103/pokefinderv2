path = require('path');
HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: ['@babel/polyfill','./src/js/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            {
                test: /\.(scss)$/,
                use: [
                    { loader: 'style-loader', },
                    { loader: 'css-loader', },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('autoprefixer')];
                            }
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html',
                                output:'./dist/index.html' })
    ]
};