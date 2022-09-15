module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier'],
  /* 规则详解 https://eslint.bootcss.com/docs/rules/
   * 关闭规则："off" or 0
   * 警告："warn" or 1
   * 报错："error" or 2
   */
  rules: {
    'prettier/prettier': [
      2,
      {
        singleQuote: true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
        arrowParens: 'avoid', // 尽可能省略括号。例子：x => x
        trailingComma: 'es5',
      },
    ],
    // Possible Errors 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关
    'arrow-body-style': [2, 'as-needed'], // 要求箭头函数体使用大括号
    'prefer-arrow-callback': 0, // 要求回调函数使用箭头函数
    'no-await-in-loop': 2, // 禁止在循环中出现 await
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁用 console
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁用 debugger

    // Best Practices 最佳实践的，帮助你避免一些问题
    'accessor-pairs': 2, // 强制 getter 和 setter 在对象中成对出现
    'array-callback-return': 2, // 强制数组方法的回调函数中有 return 语句
    'block-scoped-var': 2, // 强制把变量的使用限制在其定义的作用域范围内
    // 'class-methods-use-this': 2, // 强制类方法使用 this
    curly: [2, 'all'], // 强制所有控制语句使用一致的括号风格
    'dot-location': 0, // 强制在点号之前或之后换行
    'dot-notation': 2, // 要求使用点号
    eqeqeq: [2, 'always', { null: 'ignore' }], // 要求使用 === 和 !==
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁用 alert、confirm 和 prompt
    'no-caller': 2, // 禁用 arguments.caller 或 arguments.callee
    'no-else-return': 2, //	禁止 if 语句中 return 语句之后有 else 块
    'no-empty-function': 2, // 禁止出现空函数
    'no-empty-pattern': 2, // 禁止使用空解构模式
    'no-eq-null': 2, // 禁止在没有类型检查操作符的情况下与 null 进行比较
    'no-eval': 2, // 	禁用 eval()
    'no-floating-decimal': 2, // 禁止数字字面量中使用前导和末尾小数点
    'no-implicit-globals': 2, // 禁止在全局范围内使用变量声明和 function 声明
    'no-implied-eval': 2, // 禁止使用类似 eval() 的方法
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-multi-str': 2, // 禁止使用多行字符串
    'no-new-wrappers': 2, // 禁止对 String，Number 和 Boolean 使用 new 操作符
    // 'no-param-reassign': 2, // 禁止对 function 的参数进行重新赋值
    'no-return-assign': 0, // [2, 'except-parens'], // 禁止在 return 语句中使用赋值语句
    'no-self-compare': 2, // 禁止自身比较
    'no-useless-concat': 2, // 禁止不必要的字符串字面量或模板字面量的连接
    'no-useless-return': 2, // 禁止多余的 return 语句
    'require-await': 2, // 禁止使用不带 await 表达式的 async 函数
    'wrap-iife': [2, 'inside'], // 要求 IIFE 使用括号括起来
    yoda: [2, 'never'], // 要求或者禁止Yoda条件 https://eslint.bootcss.com/docs/rules/yoda

    // 变量声明
    'no-shadow': 2, // 禁止变量声明与外层作用域的变量同名

    // 代码风格
    'array-bracket-spacing': 2, // 强制数组方括号中使用一致的空格
    'block-spacing': [2, 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'brace-style': 2, // 强制在代码块中使用一致的大括号风格
    camelcase: 2, // 强制使用骆驼拼写法命名约定
    'comma-dangle': [2, 'only-multiline'], // 要求或禁止对象末尾逗号
    // 强制在逗号前后使用一致的空格
    'comma-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': [2, 'last'], // 强制使用一致的逗号风格
    'computed-property-spacing': 2, // 强制在计算的属性的方括号中使用一致的空格
    'func-call-spacing': 2, // 要求或禁止在函数标识符和其调用之间有空格
    // 强制使用一致的缩进
    /* indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ] */
    indent: 0,
    // 强制在对象字面量的键和值之间使用一致的空格
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    // 强制关键字周围空格的一致性
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    'linebreak-style': 2, // 强制使用一致的换行风格
    // 'lines-around-comment': 2, // 强制注释周围有空行
    'max-depth': [2, 4], // 强制块语句的最大可嵌套深度
    'max-nested-callbacks': [2, 3], // 强制回调函数最大嵌套深度
    'max-params': [2, 3], // 限制函数定义中最大参数个数
    // 要求构造函数首字母大写
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false,
      },
    ],
    'new-parens': 2, // 要求调用无参构造函数时带括号
    'newline-per-chained-call': 2, // 要求方法链中每个调用都有一个换行符
    'no-multiple-empty-lines': [1, { max: 2 }], // 不允许多个空行
    'no-trailing-spaces': 2, // 禁用行尾空白
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'object-curly-newline': 2, // 强制大括号内换行符的一致性
    // 强制在大括号中使用一致的空格
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false,
      },
    ],
    'object-property-newline': 2, // 强制将对象的属性放在不同的行上
    // 强制函数中的变量要么一起声明要么分开声明
    'one-var': [
      2,
      {
        initialized: 'consecutive',
      },
    ],
    'one-var-declaration-per-line': [2, 'always'], // 要求或禁止在变量声明周围换行
    // 强制操作符使用一致的换行符风格
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    'padded-blocks': [2, 'never'], // 要求或禁止块内填充
    'quote-props': [
      2,
      'as-needed',
      {
        keywords: false,
        unnecessary: true,
        numbers: true,
      },
    ],
    // 强制使用一致的反勾号、双引号或单引号
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    // 要求或禁止使用分号代替 ASI 换行
    semi: 2,
    // 强制分号之前和之后使用一致的空格
    'semi-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    'semi-style': [2, 'last'], // 强制分号的位置
    'space-before-blocks': [2, 'always'], // 强制在块之前使用一致的空格
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ], // 强制在 function的左括号之前使用一致的空格
    'space-in-parens': [2, 'never'], // 强制在圆括号内使用一致的空格
    'space-infix-ops': 2, // 要求操作符周围有空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ',',
        ],
      },
    ],
    'eol-last': 2,

    // es6+
    'arrow-parens': [2, 'as-needed'], // 要求箭头函数的参数使用圆括号
    // 强制 generator 函数中 * 号周围使用一致的空格
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    'jsx-quotes': [2, 'prefer-double'],
  },
};
