
/* 起始时间触发后一段时间内执行，如果在这段时间内再次触发，会重新计算起始时间 */

function debounce(fn, interval) {
  let timer = null;

  return function() {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, interval);
  };
}

const scroll = function() {
  console.log(this.name);
};

const scrollWrap = debounce(scroll, 1000);

document.addEventListener("scroll", scrollWrap);
document.name = 1;
