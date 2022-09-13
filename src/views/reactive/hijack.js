// 重写数组的方法
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(
  (method) => {
    Object.defineProperty(arrayMethods, method, {
      enumerable: false,
      configurable: true,
      writable: true,
      value(...args) {
        console.log(args);
        /* const ob = this.__ob__;
        // notify change
        ob.dep.notify(); */
        return arrayProto[method].apply(this, args);
      }
    });
  }
);
export default arrayMethods;
