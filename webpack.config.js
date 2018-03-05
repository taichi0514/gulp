const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  watch: true,
  entry: __dirname + "/htdocs/js/app.js", //ビルドするファイル
  entry: {
    // "vendor":['jquery'],
    "main": __dirname + '/htdocs/js/app.js'
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
    rules: [{
      // ローダーの処理対象ファイル
      test: /\.js$/,
      // ローダーの処理対象から外すディレクトリ
      exclude: /node_modules/,
      // 利用するローダー
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }],
    }],

  },
};