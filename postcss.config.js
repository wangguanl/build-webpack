// https://github.com/postcss/postcss/blob/main/docs/README-cn.md
// https://github.com/2createStudio/postcss-sprites
// https://github.com/hudochenkov/postcss-sorting
// https://github.com/borodean/postcss-assets
// https://github.com/cleverboy32/postcss-ui-theme
module.exports = {
  plugins: {
    'postcss-preset-env': {
      // 其他选项
      /* stage-0 非官方草案
        stage-1 编辑草案或早期工作草案
        stage-2 工作草案
        stage-3 候选版本
        stage-4 推荐标准
     */
      // stage: 0,
      autoprefixer: {
        /* overrideBrowserslist: {
          production: ['Firefox > 20'],
          development: [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version",
          ]
        }, */
        // 使用 npx browserslist 查看当前配置兼容的浏览器列表
        /* overrideBrowserslist: [
          "last 2 versions", //  最新的两个发行版本
          "no dead", // 通过last 2 versions 筛选的浏览器版本中，全球使用率低于0.5%并且官方申明不再维护或者事实上已经两年没有在更新的版本，不再兼容这些版本。
          'Android >= 4.0',
          'iOS >= 7',
          "last 3 iOS versions",
          "> 1%", // 全球超过1%人使用的浏览器
          "ie >= 8", // 方向排除部分版本
          "Firefox ESR", // 火狐最新版本
          "Firefox > 20", // Firefox的版本比20更新 >=，< 并且也可以 <= 工作
          "cover 99.5%",  // 提供覆盖的最流行的浏览器
        ] */
      },
    },
    cssnano: {
      preset: [
        "default",
        {
          discardComments: { removeAll: true },
        },
      ],
    },
    'postcss-plugin-px2rem': {
      rootValue: 750 / 10, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
      unitPrecision: 2, //允许REM单位增长到的十进制数字。
      //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
      // propBlackList: [], //黑名单
      exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      // selectorBlackList: ['tab-bar', 'tab-bar-item','shopping-cart-bottom-bar'], //要忽略并保留为px的选择器 类
      // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
      // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
      mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
      minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
      viewportUnit: 'rem',
    },
    /* 'postcss-sorting': {
      order: [
        'custom-properties',
        'dollar-variables',
        'declarations',
        'at-rules',
        'rules',
      ],
      'properties-order': 'alphabetical',
      'unspecified-properties-position': 'bottom',
    }, */
  }

}
