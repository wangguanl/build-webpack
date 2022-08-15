// webpack-dev-server实际上相当于启用了一个express的Http服务器+调用webpack-dev-middleware。它的作用主要是用来伺服资源文件。这个Http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会用webpack实时的编译，再用webpack-dev-middleware将webpack编译后文件会输出到内存中。适合纯前端项目，很难编写后端服务，进行整合。
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../config/webpack.dev.conf");

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer };
const server = new WebpackDevServer(devServerOptions, compiler);


// 启动服务器，然后运行回调函数
server.startCallback(() => {
  console.log("Starting server on http://localhost:8080");
});

// 启动服务器。
/* const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};
runServer(); */
