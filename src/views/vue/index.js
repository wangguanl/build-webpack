import { createApp } from 'petite-vue';
import Swiper from 'swiper';
import 'swiper/css';
createApp({
  message: 'Hello World!',
  counter: {
    count: 0,
  },
}).mount('#app');
console.log($.extend({}, { a: 1 }, { b: 2 }));
console.log(Swiper);
