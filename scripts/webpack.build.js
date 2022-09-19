const Webpack = require('webpack'),
  webpackConfig = require('./config/webpack.prod.conf');
Webpack(webpackConfig, (/* a, b */) => {
  /* console.log(a, b); */
});
