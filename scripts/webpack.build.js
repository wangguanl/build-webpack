const Webpack = require("webpack");
const webpackConfig = require("../config/webpack.prod.conf");
Webpack(webpackConfig, (a, b, c) => {
  console.log(a)
  // console.log(b)
  // console.log(c)
});
