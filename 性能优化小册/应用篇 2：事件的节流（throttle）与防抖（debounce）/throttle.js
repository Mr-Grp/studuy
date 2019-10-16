
/* 从第一次开始一段时间内触发几次，都只会在这段时间结束时执行一次 */

function throttle(fn, interval) {
  let last = 0;

  return function() {
    let context = this;
    let args = arguments;
    let now = +new Date();

    if (now - last >= interval) {
      last = now;
      fn.apply(context, args);
    }
  };
}

const scroll = function() {
  console.log(this.name);
};

const scrollWrap = throttle(scroll, 1000);

document.addEventListener("scroll", scrollWrap);
document.name = 1;

