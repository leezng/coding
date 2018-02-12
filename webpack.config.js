var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './example/main.js',
  output: {
    path: path.resolve(__dirname, './example-dist'),
    filename: '[name].[chunkhash].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'src': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // filename: process.env.NODE_ENV === 'testing'
      //   ? 'index.html'
      //   : config.build.index,
      filename: 'index.html',
      template: './example/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // 在 UglifyJs 删除没有用到的代码时不输出警告
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: 'static'
      }
    ])
  ]
}
