// 判断复杂数据类型的：数组、对象
export const isObject = (obj) => obj !== null && typeof obj === 'object';

export const hasOwn = (obj, key) =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const def = (obj, key, value, enumerable) =>
  Object.defineProperty(obj, key, {
    value,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
