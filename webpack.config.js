const webpack = require("webpack"),
UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: __dirname + "/htdocs/js/app.js", //ビルドするファイル
  entry: {
    // "vendor":['jquery'],
    "bundle": __dirname + '/htdocs/js/app.js'
    // "profile": __dirname +'/htdocs/js/components.js',
  },
  output: {
    path: __dirname + '/htdocs/js/', //ビルドしたファイルを吐き出す場所
    filename: '[name].js' //ビルドした後のファイル名
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    })
  ],
  module: {
    loaders: [
      //loader
    ]
  }
};