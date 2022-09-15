import defineReactive from './defineReactive';
import observe from './observe';
import arrayMethods from './hijack';
import { def } from './util';

/**
 * Observer类会通过递归的方式把一个对象的所有属性都转化成可观测对象
 */
export default class Observer {
  constructor(value) {
    this.value = value;
    def(value, '__ob__', this);
    // 当value为数组时的逻辑
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      value.forEach(val => observe(val));
    } else {
      // 当value为对象时的逻辑
      this.walk(value);
    }
  }

  walk(value) {
    Object.keys(value).forEach(key => defineReactive(value, key));
  }
}
