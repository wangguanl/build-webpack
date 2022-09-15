const path = require('path'),
  { merge } = require('webpack-merge'),
  commonConfig = require('./webpack.common'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  ESLintPlugin = require('eslint-webpack-plugin');
module.exports = merge(commonConfig, {
  // devtool: false,
  output: {
    path: path.resolve(__dirname, '../../dev/'),
    filename: '[name].js',
    clean: true, // 删除dist
    // publicPath: "/",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
  ],
});
