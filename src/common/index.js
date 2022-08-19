console.log(process.env.BASE_API);
console.log(process.env.NODE_ENV);
console.log(process.env.ENV_TYPE);
// import 'babel-polyfill';
if (process.env.ENV_TYPE !== 'prod') {
  const vConsole = require('vconsole');
  new vConsole();
}
import '@/assets/css/normalize.css';
import '@/assets/css/reset.scss';
// import 'lib-flexible';
import _ from 'lodash';
