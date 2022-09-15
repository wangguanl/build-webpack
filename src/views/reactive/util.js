// 判断复杂数据类型的：数组、对象
export const isObject = obj => obj !== null && typeof obj === 'object';

export const hasOwn = (obj, key) =>
  Object.prototype.hasOwnProperty.call(obj, key);

// eslint-disable-next-line max-params
export const def = (obj, key, value, enumerable) =>
  Object.defineProperty(obj, key, {
    value,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });

/**
 * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
 * 使用函数柯里化的技巧
 */
export const parsePath = path => {
  // 判断path是否正确
  if (/[^\w.$]/.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj) {
    // 两种写法
    /* let key = ''
    while (key = segments.shift()) {
        // 判断obj是否正确
        if (!obj) return;
        obj = obj[key]
    } */
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
};
