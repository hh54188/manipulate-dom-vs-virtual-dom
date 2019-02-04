const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/redux.js',
  // entry: './src/index.js',
  mode: 'development',
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "public"),
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true,
    overlay: {
      error: true
    }
  },
  plugins: [
    new HappyPack({
      loaders: ["babel-loader"]
    }),
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.less$/,
        loaders: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: { javascriptEnabled: true }
          }
        ]
      }
    ]
  }
}