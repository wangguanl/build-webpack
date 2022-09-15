export const mouseScroll = () => {
  let timer;
  // 防抖节流函数
  return ({ el, time = 300, fn }) => {
    el.addEventListener('scroll', () => {
      let scrollHeightVal = el.scrollHeight,
        scrollTopVal = el.scrollTop,
        tbodyHeight = el.clientHeight;

      clearTimeout(timer);

      timer = setTimeout(() => {
        if (scrollTopVal + tbodyHeight > scrollHeightVal - 20) {
          fn && fn();
        }
      }, time);
    });
  };
};
export const mouseClick = () => {
  let timer;
  // 防抖节流函数
  return ({ el, time = 300, fn }) => {
    el.addEventListener('keyup', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn && fn();
      }, time);
    });
  };
};
