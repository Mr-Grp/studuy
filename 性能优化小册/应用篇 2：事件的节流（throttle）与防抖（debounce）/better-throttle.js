/* 起始时间触发后一段时间内执行，如果在这段时间内再次触发，会重新计算起始时间 */
/* 如果超过一段时间还没有执行，则立即执行一次 */

function debounce(fn, interval) {
  let timer = null;
  let last = 0;

  return function() {
    let context = this;
    let args = arguments;

    let now = +new Date();
    if (now - last < interval) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, interval);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

const scroll = function() {
  console.log(this.name);
};

const scrollWrap = debounce(scroll, 1000);

document.addEventListener("scroll", scrollWrap);
document.name = 1;
