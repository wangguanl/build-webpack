const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = merge(commonConfig, {
  // devtool: false,
  output: {
    path: path.resolve(__dirname, '../../dev/'),
    filename: '[name].js',
    clean: true // 删除dist
    // publicPath: "/",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false
    }),
    new CleanWebpackPlugin()
  ]
});
