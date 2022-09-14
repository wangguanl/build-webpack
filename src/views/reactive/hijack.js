// 重写数组的方法
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
import { def } from './util';
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(
  (method) => {
    def(
      arrayMethods,
      method,
      function (...args) {
        console.log(args);
        /* const ob = this.__ob__;
      // notify change
      ob.dep.notify(); */
        return arrayProto[method].apply(this, args);
      },
      false
    );
  }
);
export default arrayMethods;
