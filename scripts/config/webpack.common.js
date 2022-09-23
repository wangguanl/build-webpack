const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  // 获取env环境变量
  dotenv = require('dotenv'),
  glob = require('glob');
// var Ex = require('extract-text-webpack-plugin'); // https://blog.csdn.net/xfxf996/article/details/82813908
const { NODE_ENV = 'production', ENV_TYPE } = process.env,
  // 加载.env*文件  默认加载.env文件
  { parsed } = dotenv.config({
    path: path.resolve(__dirname, `../../.env.${ENV_TYPE}`),
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
 * 生成雪碧图
 * 生成依赖预览图
 * 配置babel、postcss
 * 生成cli脚手架
 * 符合专题模板
 * 性能优化
 */
const BaseSrc = path.join(__dirname, '../../src/');
console.log(BaseSrc);

console.log(NODE_ENV, ENV_TYPE);
const entry = {},
  HtmlWebpackPlugins = [];
(() => {
  glob.sync('./src/views/**').forEach(file => {
    // console.log(file, path.extname(file));
    const extname = path.extname(file),
      [, filename] = file.match(/src\/views\/(.*)/) || [],
      filepath = path.join(BaseSrc, '../', file);
    // 只会打包index.js， 其他引入由index同步引入或异步引入
    if (extname === '.js' && path.basename(file) === 'index.js') {
      entry[filename.replace('.js', '')] = filepath;
    } else if (extname === '.html') {
      // console.log(filename);
      // https://github.com/jantimon/html-webpack-plugin#options
      HtmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          filename,
          template: filepath, // 自定义 html 模板
          // publicPath: '',

          // 1、true或者body：所有JavaScript资源插入到body元素的底部
          // 2、head: 所有JavaScript资源插入到head元素中
          // 3、false： 所有静态资源css和JavaScript都不会注入到模板文件中

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
              content: 'IE=edge,chrome=1',
            },
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
            useShortDoctype: true,
          },
          chunks: ['main', filename.replace('.html', '')],
          /* chunks: ['main', (()=>{
            if(entry[filename.replace('.html', '')]){
              return entry[filename.replace('.html', '')]
            }
            const filepath = filename.split('/')
            if(entry[filepath[filepath.length]])
            return entry[entryJs] ? entry[entryJs] :  entry[entryJs]
          })()] */
          // 设置资源基础路径
          /* base: {
            href: "http://example.com/some/page.html",
            target: "_blank",
          }, */
        })
      );
    }
  });

  return {
    entry,
    HtmlWebpackPlugins,
  };
})();
// console.log(entry, HtmlWebpackPlugins);

module.exports = {
  mode: NODE_ENV,
  devtool: ENV_TYPE === 'prod' ? false : 'source-map', // 正式环境不会生成sourceMap
  entry: {
    main: path.resolve(BaseSrc, 'main'),
    ...entry,
    /* index: viewsResolvePath('/index'),
    test: viewsResolvePath('/test'),
    sku: viewsResolvePath('/sku'),
    mustache: viewsResolvePath('/mustache'),
    child: viewsResolvePath('/mustache/child') */
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
        use: [
          /* ENV_TYPE === 'dev' ?
            "style-loader" // 将 JS 字符串生成为 style 节点
            : MiniCssExtractPlugin.loader, */
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: true,
            },
          }, // 将 CSS 转化成 CommonJS 模块
          'postcss-loader', // 将 CSS 添加浏览器前缀 等作用(https://www.postcss.com.cn/)
          // 将 Sass 编译成 CSS
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import "@/styles/mixin.scss";
                @import "@/styles/BEM.scss";
              `,
            },
          },
        ],
      },
      /* {
        test: /\.js$/i,
        use: ['babel-loader']
      }, */
      {
        test: /\.m?js$/,
        include: BaseSrc,
        loader: 'babel-loader',
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
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: 'images/[contenthash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: BaseSrc,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[contenthash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': BaseSrc,
    },
    extensions: ['.js', '.css', '.scss'],
    modules: [
      BaseSrc,
      'node_modules',
      path.join(__dirname, '../../node_modules'),
    ],
  },
  /* externals: {
    lodash: 'lodash',
    jquery: 'jQuery',
  }, */
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all', // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
      cacheGroups: {
        /* vendors: {
          name: 'split-chunks_modules',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        }, */
        // 核心库
        libs: {
          name: 'split-chunks_modules-libs',
          test: /[\\/]node_modules[\\/](jquery|petite-vue|lib-flexible)[\\/]/,
          chunks: 'all',
        },
        // 插件
        plugins: {
          name: 'split-chunks_modules-plugins',
          test: /[\\/]node_modules[\\/](swiper)[\\/]/,
          chunks: 'all',
        },
        // 工具函数
        utils: {
          name: 'split-chunks_modules-utils',
          test: /[\\/]node_modules[\\/](lodash)[\\/]/,
          chunks: 'all',
        },
        // 抽离自定义工具库
        commons: {
          name: 'split-chunks_common-utils',
          minSize: 0, // 将引用模块分离成新代码文件的最小体积
          minChunks: 2, // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
          priority: -20,
        },
      },
    },
  },
  plugins: [
    // 向应用程序注入环境变量
    new webpack.DefinePlugin({
      process: {
        env: {
          ...parsed,
          ENV_TYPE: `'${ENV_TYPE}'`,
        },
      },
    }),
    // 注入插件
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    ...HtmlWebpackPlugins,
  ],
};
