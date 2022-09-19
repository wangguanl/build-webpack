import 'normalize.css';
import '@/assets/css/reset.css';
import 'lib-flexible';

if (process.env.NODE_ENV === 'prod') {
  // require('es6-promise').polyfill();
  // require('babel-polyfill');
} else if (process.env.ENV_TYPE !== 'prod') {
  // const VConsole = require('vconsole');
  // new VConsole();
}
