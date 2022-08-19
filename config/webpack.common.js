const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
// var Ex = require('extract-text-webpack-plugin'); // https://blog.csdn.net/xfxf996/article/details/82813908
const { NODE_ENV = 'production', ENV_TYPE } = process.env;
// 加载.env*文件  默认加载.env文件
const { parsed } = dotenv.config({
  path: path.resolve(__dirname, `../.env.${ENV_TYPE}`)
});
console.log(parsed);
/*
 * 模块热替换：(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：保留在完全重新加载页面期间丢失的应用程序状态。只更新变更内容，以节省宝贵的开发时间。在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式。
 * 规范 eslint
 * 区分多个环境打包：dev、test、pre、prod
 * 多入口文件、多文件通用部分（可能编译一个通用bundle），抽离公共头部、title、全局 css、utils工具函数
 * 根据监视文件进行编译，不会被其他文件污染（修改其他文件不会生效）
 * 删除终端多余logo
 * 后端代码打包编译
 * 微前端、ssr
 * 生成cli脚手架
 * 生成雪碧图
 * 生成依赖预览图
 * 配置babel、postcss
 * 生成cli脚手架
 * 符合专题模板
 * 性能优化
 */
const BaseSrc = path.join(__dirname, '..', 'src/');
console.log(BaseSrc);
function viewsResolvePath(fileName) {
  return path.join(BaseSrc, 'views', fileName);
}
function generateUtils() {
  function utilsResolvePath(fileName) {
    return path.relative(BaseSrc, 'utils', fileName);
  }
  const dependOn = [],
    entryUtils = {},
    modules = ['lodash'],
    commons = ['index'];
  utils = [
    'deep-copy',
    'parse-url',
    'verify-var',
    'unique',
    'validation',
    'cookies'
  ];

  modules.forEach((moduleName) => (entryUtils[moduleName] = moduleName));
  commons.forEach((fileName) => {
    const filePath = path.join(BaseSrc, 'common', fileName);
    dependOn[`shared-common_${fileName}`] = filePath;
    entryUtils[`shared-common_${fileName}`] = filePath;
  });
  utils.forEach((fileName) => {
    const filePath = path.join(BaseSrc, 'utils', fileName);
    dependOn[`shared-util_${fileName}`] = filePath;
    entryUtils[`shared-util_${fileName}`] = filePath;
  });
  console.log(entryUtils);
  return [entryUtils, [...modules, ...dependOn]];
}
const [entryUtils, dependOn] = generateUtils();
console.log(dependOn);
console.log(NODE_ENV, ENV_TYPE);
/*
 * 正式环境不会生成sourceMap
 *
 */
module.exports = {
  mode: NODE_ENV,
  devtool: ENV_TYPE === 'prod' ? false : 'source-map',
  entry: {
    // index: "./src/index.js",
    // test: "./src/test.js",
    // ...entryUtils,
    lodash: 'lodash',
    common: {
      import: path.join(BaseSrc, 'common')
    },
    index: {
      import: viewsResolvePath('/index'),
      dependOn: 'lodash'
      // dependOn,
    },
    test: {
      import: viewsResolvePath('/test')
      // dependOn,
    },
    sku: {
      import: viewsResolvePath('/sku')
      // dependOn,
    },
    mustache: ['common', viewsResolvePath('/mustache')]
    // generateUUID: "./src/utils/generateUUID.js",
  },
  output: {
    // filename: "bundle.js",
    filename: 'js/[name].bundle.[contenthash].js',
    // path: path.resolve(__dirname, "dist/" + mode + "-" + new Date().getTime()),
    clean: true // 删除dist
    // publicPath: "/",
  },
  optimization: {
    moduleIds: 'deterministic', // named
    runtimeChunk: 'single',
    /* runtimeChunk: {
      name: (entryPoint) => `runtime-chunk~${entryPoint.name}`,
    }, */
    splitChunks: {
      // chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    }
  },
  /* `yarn add assert buffer console-browserify constants-browserify crypto-browserify domain-browser events stream-http https-browserify os-browserify/browser path-browserify punycode process/browser querystring-es3 stream-browserify string_decoder util timers-browserify tty-browserify url vm-browserify browserify-zlib`, */
  resolve: {
    alias: {
      '@': BaseSrc
    },
    extensions: ['.js', '.css', '.scss'],
    modules: [
      BaseSrc,
      'node_modules',
      path.join(__dirname, '..', 'node_modules')
    ]
  },
  module: {
    rules: [
      /* {
        test: /\.(html)$/i,
        include: BaseSrc,
      }, */
      /* {
        test: /\.scss/i,
        include: BaseSrc,
        loader: Ex.extract('style-loader', 'css-loader', 'sass-loader')  // 单独打包出CSS，这里配置注意下
      }, */
      {
        test: /\.(s[ac]ss|css)$/i,
        include: BaseSrc,
        use: [
          /* ENV_TYPE === 'dev' ?
            "style-loader" // 将 JS 字符串生成为 style 节点
            : MiniCssExtractPlugin.loader, */
          MiniCssExtractPlugin.loader,
          'css-loader', // 将 CSS 转化成 CommonJS 模块
          'postcss-loader',
          /* {
            // 将 CSS 添加浏览器前缀 等作用(https://www.postcss.com.cn/)
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          }, */
          'sass-loader' // 将 Sass 编译成 CSS
        ]
      },
      /* {
        test: /\.js$/i,
        use: ['babel-loader']
      }, */
      {
        test: /\.m?js$/,
        include: BaseSrc,
        loader: 'babel-loader'
        /* use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
          // plugins: ['@babel/plugin-proposal-object-rest-spread']
        } */
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: BaseSrc,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          filename: 'images/[contenthash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: BaseSrc,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[contenthash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          ...parsed,
          ENV_TYPE: `'${ENV_TYPE}'`
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
      ignoreOrder: false
    }),
    new HtmlWebpackPlugin({
      // filename: "index.[contenthash].html",
      template: viewsResolvePath('/index/index.html'), // 自定义 html 模板
      title: 'webpack-jquery',
      publicPath: '',
      /*
        1、true或者body：所有JavaScript资源插入到body元素的底部
        2、head: 所有JavaScript资源插入到head元素中
        3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
      */
      inject: 'body',
      hash: false, // 使用 hash 命名文件，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式：common.js?a3e1396b501cdd9041be
      // hot: true,
      // 模板添加 meta 元素标签
      meta: {
        viewport:
          'width=device-width, initial-scale=1,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no, shrink-to-fit=no',
        'theme-color': '#4285f4',
        renderer: 'webkit',
        'X-UA-Compatible': {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge,chrome=1'
        }
      },
      /*
       * {'blocking'|'defer'|'module'} || defer
       * 现代浏览器支持非阻塞 javascript 加载 ( 'defer') 以提高页面启动性能。设置为'module'添加属性type="module"。这也意味着“延迟”，因为模块会自动延迟。
       */
      scriptLoading: 'defer',
      favicon: '', // 将给定的图标路径添加到输出 HTML
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
      // chunks: ['index']
      // 设置资源基础路径
      /* base: {
        href: "http://example.com/some/page.html",
        target: "_blank",
      }, */
    }),
    new HtmlWebpackPlugin({
      filename: 'mustache.html',
      template: viewsResolvePath('/mustache/index.html'), // 自定义 html 模板
      publicPath: '',
      hash: false, // 使用 hash 命名文件
      // 模板添加 meta 元素标签
      inject: 'body',
      title: 'mustache',
      scriptLoading: 'defer',
      favicon: '', // 将给定的图标路径添加到输出 HTML
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#4285f4',
        renderer: 'webkit',
        'X-UA-Compatible': {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge,chrome=1'
        }
      },
      chunks: ['mustache']
    })
  ]
};
