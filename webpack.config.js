const webpack = require("webpack"),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

module.exports = {
  entry: "./htdocs/js/app.js",
  output: {
    path: path.resolve(__dirname, 'htdocs/dist/js'),
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  devServer: {
    contentBase: 'htdocs',
    inline: false,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [`@babel/preset-env`]
          }
        }
      }
    ]
  }
};