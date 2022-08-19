const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
module.exports = merge(commonConfig, {
  // 如果你碰到了问题，请将路由导航至 /webpack-dev-server 将会为你展示服务文件的位置。例如： http://localhost:8080/webpack-dev-server。
  devServer: {
    // 为访问路径的文件创建服务
    static: {
      directory: path.join(__dirname, 'devDist'),
      publicPath: '',
      serveIndex: true // 中间件会在查看没有 index.html 文件的目录时生成目录列表
      // 监听文件,文件更改将触发整个页面重新加载。
      /* watch: {
        ignored: "*.txt",
        usePolling: false,
      }, */
    }, // 服务器已经启动后打开浏览器
    compress: true, // 启用 gzip compression 压缩
    host: '0.0.0.0', // 服务器可以被外部访问
    port: 8080, // 端口 auto
    /* open: {
      target: 'http://localhost:8080',
      app: {
        name: 'chrome', // chrome firefox edge
      },
    }, */
    watchFiles: {
      paths: [`${path.join(__dirname, '..', 'src')}/**`],
      options: {
        usePolling: false
      }
    },
    webSocketServer: 'ws',
    hot: false, // 启用 webpack 的 热模块替换 特性
    liveReload: true, // 默认情况下，当监听到文件变化时 dev-server 将会重新加载或刷新页面。为了 liveReload 能够生效，devServer.hot 配置项必须禁用或者 devServer.watchFiles 配置项必须启用。将其设置为 false 以禁用 devServer.liveReload

    /* 为 webpack-dev-middleware 提供处理 webpack 资源的配置项。 */
    devMiddleware: {
      index: true,
      mimeTypes: { 'text/html': ['phtml'] },
      publicPath: '/', // 入口地址
      serverSideRender: true,
      writeToDisk: true
    },

    // 响应请求时添加header
    headers: {},

    client: {
      reconnect: true, // 告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。
      overlay: { errors: true, warnings: true }, //当出现编译错误或警告时，在浏览器中显示全屏覆盖。
      progress: false, // 在浏览器中以百分比显示编译进度。
      logging: 'log' // 允许在浏览器中设置日志级别，例如在重载之前，在一个错误之前或者 热模块替换 启用时。
    },
    // 使用 spdy 提供 HTTP/2 服务。对于 Node 15.0.0 及更高版本，此选项将被忽略，因为 spdy 在这些版本中已被破坏。一旦 Express 支持，开发服务器将迁移到 Node 内置的 HTTP/2。HTTP/2 带有自签名证书：
    http2: false,
    // 使用HTML5 History API 时，index.html可能必须提供页面来代替任何404响应。devServer.historyApiFallback通过将其设置为启用true
    historyApiFallback: {
      /* rewrites: [
        { from: /^\/$/, to: "/views/landing.html" },
        { from: /^\/subpage/, to: "/views/subpage.html" },
        { from: /./, to: "/views/404.html" },
      ], */
    },

    // 提供服务器内部在所有其他中间件之后执行 自定义中间件的能力
    onAfterSetupMiddleware(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' });
      });
    },
    // 提供在服务器内部执行所有其他中间件之前执行自定义中间件的能力。 这可以用来定义自定义处理程序
    onBeforeSetupMiddleware(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' });
      });
    },

    // 提供在 webpack-dev-server 开始监听端口连接时执行自定义函数的能力。
    onListening(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      const port = devServer.server.address().port;
      console.log('Listening on port:', port);
    },
    proxy: [
      {
        '/api': {
          target: process.env.VUE_APP_BASE_API,
          pathRewrite: { '^/api': '' }, // 如果不希望传递/api，则需要重写路径：
          secure: false, // 默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器。 如果需要，可以这样修改配置

          /*
           * 有时不想代理所有内容。 可以基于函数的返回值绕过代理。在该功能中，可以访问请求，响应和代理选项。
           * 返回 null 或 undefined 以继续使用代理处理请求。
           * 返回 false 会为请求产生 404 错误。
           * 返回提供服务的路径，而不是继续代理请求。
           */
          bypass: function (req, res, proxyOptions) {
            if (req.headers.accept.indexOf('html') !== -1) {
              console.log('Skipping proxy for browser request.');
              return '/index.html';
            }
          }
        }
      }
    ]
    /* // 如果想将多个特定路径代理到同一目标，则可以使用一个或多个带有 context 属性的对象的数组：
    proxy: [
      {
        context: ["/auth", "/api"],
        target: "http://localhost:3000",
      },
    ], */
  }
});
