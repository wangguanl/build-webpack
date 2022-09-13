import Observer from './observer';
/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
export default function defineReactive(data, key, val) {
  if (arguments.length === 2) {
    val = data[key];
  }
  // 当val为对象时，则不满足直接赋值，则需要进行递归劫持监听
  if (typeof val === 'object') {
    new Observer(val);
    // Object.keys(val).forEach((key) => defineReactive(val, key, val[key]));
  }
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`访问属性${key}的值`);
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      console.log(`修改属性${key}的值为` + newVal);
      return (val = newVal);
    }
  });
}
