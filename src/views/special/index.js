/* eslint-disable no-undef */
// import 'normalize.css';
import Swiper from 'swiper';
import 'swiper/css';
// import 'dyrs__css_reset.css';
import './index.scss';

function tow(n) {
  return n >= 0 && n < 10 ? '0' + n : '' + n;
}

// @url 可传入 ?a=1&b=2&c=3&b=4 解析为对象 {a:1, b:2, c:3, d:4}
const parseQueryString = url => {
  var json = {},
    arr = url.substr(url.indexOf('?') + 1).split('&');
  arr.forEach(item => {
    var tmp = item.split('=');
    json[tmp[0]] = tmp[1];
  });
  return json;
};
var $dayNum1 = $('.day-num1'),
  $dayNum2 = $('.day-num2'),
  $minuteNum1 = $('.minute-num1'),
  $minuteNum2 = $('.minute-num2'),
  $secondNum1 = $('.second-num1'),
  $secondNum2 = $('.second-num2');
function getDate() {
  var oDate = new Date(), // 获取日期对象
    oldTime = oDate.getTime(), // 现在距离1970年的毫秒数
    newDate = new Date('2022/11/25 00:00:00'),
    newTime = newDate.getTime(), // 2019年距离1970年的毫秒数
    second = Math.floor((newTime - oldTime) / 1000), // 未来时间距离现在的秒数
    day = Math.floor(second / 86400); // 整数部分代表的是天；一天有24*60*60=86400秒 ；

  second = second % 86400; // 余数代表剩下的秒数；

  second %= 3600; // 余数代表 剩下的秒数；

  var minute = Math.floor(second / 60);

  second %= 60;
  day = tow(day).split('');
  minute = tow(minute).split('');
  second = tow(second).split('');
  $dayNum1.text(day[0]);
  $dayNum2.text(day[1]);
  $minuteNum1.text(minute[0]);
  $minuteNum2.text(minute[1]);
  $minuteNum1.text(minute[0]);
  $minuteNum2.text(minute[1]);
  $secondNum1.text(second[0]);
  $secondNum2.text(second[1]);
}

getDate();

setInterval(getDate, 1000);

var prizeNames = [],
  prizeWeights = [];
[
  ['一等奖', 10],
  ['二等奖', 15],
  ['三等奖', 25],
  ['四等奖', 30],
  ['五等奖', 10],
  ['六等奖', 10],
].forEach(([prizeName, prizeWeight]) => {
  prizeNames.push(prizeName);
  prizeWeights.push(prizeWeight);
});
var sortPie = [];
for (var i = 0; i < prizeWeights.length; i++) {
  sortPie.push(prizeWeights[i] + (sortPie[i - 1] || 0));
}
var weightSum = prizeWeights.reduce(function (prev, currVal) {
    return prev + currVal;
  }, 0),
  // console.log(sortPie)
  lottery = function () {
    // 生成一个权重随机数，介于0-weightSum之间
    var random = Math.random() * weightSum,
      randomIndex = -1;
    for (var i = 0; i < sortPie.length; i++) {
      if (random <= sortPie[i]) {
        randomIndex = i;
        break;
      }
    }
    var storages = parseQueryString(location.href);
    return Object.prototype.hasOwnProperty.call(storages, 'prizeIndex')
      ? storages.prizeIndex
      : randomIndex; // 返回本次抽奖结果
  },
  percentage = 360 / prizeWeights.length,
  turns = 10, // 圈数
  centerPercent = 0.5; // Math.random(); // 指针倾斜角度

$('#luck-draw').on('click', function () {
  var localStoragePrizeIndex = localStorage.getItem(location.pathname);
  // 已抽奖，弹出中奖对应的表单
  if (localStoragePrizeIndex) {
    $('.dialog-wrap form').css({
      backgroundImage: `url(https://img.dyrs.cc/special/316/100/117316/lottery-turntable-${localStoragePrizeIndex}.png)`,
    });
    $('.dialog-wrap').show();
  } else {
    var prizeIndex = lottery();
    localStorage.setItem(location.pathname, prizeIndex);
    $('.dialog-wrap form').css({
      backgroundImage: `url(https://img.dyrs.cc/special/316/100/117316/lottery-turntable-${prizeIndex}.png)`,
    });
    $('#lottery-turntable').css({
      transition: 'unset',
      transform: `rotate(0)`,
    });
    setTimeout(() => {
      $('#lottery-turntable').css({
        transition: 'all 3s ease',
        transform: `rotate(${
          (prizeWeights.length * turns + (prizeIndex - centerPercent)) *
          percentage
        }deg)`,
      });
    }, 10);
    setTimeout(() => {
      $('.dialog-wrap').show();
    }, 4000);
  }
});

$('.get-customers').on('click', function () {
  $('.dialog-wrap form').css({
    backgroundImage: `url(https://img.dyrs.cc/special/316/100/117316/dialog.png!c)`,
  });
  $('.dialog-wrap').addClass('luck-draw-style').show();
});
$('.dialog-wrap .close').on('click', function () {
  $('.dialog-wrap').removeClass('luck-draw-style').hide();
  $('.dialog-wrap form')[0].reset();
});

new Swiper('#gsa', {
  loop: true,
});
var mySwiper = new Swiper('#designer-list', {
  autoplay: 3000, // 可选选项，自动滑动
  slidesPerView: 9,
  loop: true,
});
console.log(mySwiper);
$('#slide-left').on('click', function () {
  mySwiper.slidePrev();
});
$('#slide-right').on('click', function () {
  mySwiper.slideNext();
});

// 通过 _special__tag-name_form 属性转换成 form 标签
$('[_special__tag-name_form]').each(function (index, formEl) {
  var $form = $('<form autocomplete="off"></form>');
  for (var i = 0; i < formEl.attributes.length; i++) {
    if (formEl.attributes[i].nodeName !== 'tag-form') {
      $form.attr(formEl.attributes[i].nodeName, formEl.attributes[i].nodeValue);
    }
  }
  // 通过 _special__tag-name_input 属性转换成 input 标签
  $(formEl)
    .find('[_special__tag-name_input]')
    .each(function (ind, inputEl) {
      var $input = $(
        '<input type="text" placeholder="' + $(inputEl).text() + '">'
      );
      for (var i = 0; i < inputEl.attributes.length; i++) {
        if (inputEl.attributes[i].nodeName === '_special__tag-name_input') {
          $input.attr('name', inputEl.attributes[i].nodeValue);
        } else {
          $input.attr(
            inputEl.attributes[i].nodeName,
            inputEl.attributes[i].nodeValue
          );
        }
      }
      $input.css({
        height: '100%',
        width: '100%',
        border: 'none',
        background: 'transparent',
        top: 0,
        left: 0,
      });
      $(inputEl).replaceWith($input);
    });
  $form.html($(formEl).html());
  $(formEl).replaceWith($form);
});

/* 通过class属性生成 div 将自己(._special__animate_hover-scale元素)包裹，进行放大缩小效果 */
$('._special__animate_hover-scale').each(function (index, el) {
  var $div = $('<div>');
  for (var i = 0; i < el.attributes.length; i++) {
    $div.attr(el.attributes[i].nodeName, el.attributes[i].nodeValue);
  }
  $div.html($(el).clone().removeClass());
  $(el).replaceWith($div);
});

// 表单提交
$('[_special__on_submit]').on('click', function () {
  var $form = $(this).closest('form'),
    requiredName = {
      name: '请输入姓名',
      phone: '请输入手机号',
    };
  [...$form.find('input[type=text]')].some(function (index, el) {
    if ($(el).attr('_special__input-attr_required')) {
      if (!$(el).val().trim()) {
        alert(requiredName[$(el).attr('name')]);
        return false;
      }
    }
    return true;
  });
  if (
    !$form
      .find('input[name=phone]')
      .val()
      .trim()
      .match(/^[0-9,-]{7,13}$/)
  ) {
    alert('请输入正确的手机号');
    return false;
  }
  var navigatorType = navigator.userAgent.match(/mobile/i) ? 'H5' : 'PC',
    sendData = {
      specialid: window.specialid,
      // desc: navigatorType + "-" + document.title + "-" + btnName,
      desc:
        navigatorType +
        '-' +
        document.title +
        '-' +
        prizeNames[localStorage.getItem(location.pathname)],
    };
  $form.find('input[name]').each(function () {
    sendData[$(this).attr('name')] = $(this).val();
  });
  $.ajax({
    url: '/api/user/special_appoint.php',
    dataType: 'jsonp',
    data: sendData,
    success: function (res) {
      alert(res.msg);
      if (res.code === 1) {
        // 隐藏弹窗表单
        /*  */
        // 重置表单
        $form[0].reset();
      }
    },
    error: function () {
      alert('网络错误，请稍后重试');
      $form[0].reset();
    },
  });
});

// 当前页面弹出美恰
$('[_special__on_meiqia]').on('click', function () {
  window._MEIQIA('showPanel');
});

(function () {
  var swipers = {};

  function createSwiper(swiperContainer) {
    var swiperName = $(swiperContainer).attr('_special__new_swiper');
    swipers[swiperName] = new Swiper(swiperContainer, {
      autoplay: 3000, // 可选选项，自动滑动
      loop: true, // 可选选项，开启循环
      autoplayDisableOnInteraction: false,
      // pagination: $("[_special__new_swiper-pagination=" + swiperName + "]"),
      paginationClickable: true,
      onSlideChangeEnd: function (swiper) {
        let index = swiper.activeIndex;
        if (swiper.activeIndex > $('.swiper1-navs div').length) {
          index = 1;
        }
        $('.swiper1-navs div')
          .eq(index - 1)
          .addClass('active')
          .siblings()
          .removeClass('active');
      },
    });
    $('.swiper1-navs div').on('click', function () {
      $('.swiper-pagination span').eq($(this).index()).trigger('click');
    });
  }

  // 创建 swiper 实例
  $('[_special__new_swiper]').each(function (index, el) {
    var $SwiperWrapper = $('<div class="swiper-wrapper">'),
      imgAttributes = $(el).children()[0].attributes;
    for (var i = 0; i < imgAttributes.length; i++) {
      $(el).attr(imgAttributes[i].nodeName, imgAttributes[i].nodeValue);
    }

    $(el)
      .children()
      .each(function (ind, img) {
        var $SwiperSlide = $('<div class="swiper-slide">');
        $SwiperSlide.html($(img).removeClass());
        $SwiperWrapper.append($SwiperSlide);
      });
    $(el).css({ overflow: 'hidden' }).html($SwiperWrapper);
    createSwiper(el);
  });
  // 给按钮添加样式
  $('[_special__on_swiper-slide-next],[_special__on_swiper-slide-prev]').css({
    cursor: 'pointer',
  });
  // 上一个
  $('[_special__on_swiper-slide-prev]').on('click', function () {
    swipers[$(this).attr('_special__on_swiper-slide-prev')].slidePrev();
  });
  // 下一个
  $('[_special__on_swiper-slide-next]').on('click', function () {
    swipers[$(this).attr('_special__on_swiper-slide-next')].slideNext();
  });
})();

document.documentElement.addEventListener(
  'touchstart',
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  { passive: false }
);
// 禁止双击放大
let lastTouchEnd = 0;
document.documentElement.addEventListener(
  'touchend',
  function (event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  { passive: false }
);
