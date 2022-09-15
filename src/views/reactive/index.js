import './index.scss';

import Observer from './observer';

const obj = new Observer({
  brand: 'BMW',
  price: 3000,
  arr: [
    1,
    2,
    3,
    {
      c: 855,
      obj: {
        a: 123,
        c: {
          d: 456,
          b: {},
        },
      },
    },
    { c: 855 },
  ],
  obj: {
    a: 123,
    c: {
      d: 456,
      b: {},
    },
  },
});
console.log(obj);
obj.value.arr.push(123);
console.log(obj);
obj.value.arr[3].c = 123;
