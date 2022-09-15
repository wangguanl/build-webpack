import Observer from './observer';
import { isObject, hasOwn } from './util';
export default function observe(value) {
  // 如果是数组、对象
  if (!isObject(value)) {
    return;
  }
  let ob;
  // 查看对象身上是否存在__ob__属性
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
