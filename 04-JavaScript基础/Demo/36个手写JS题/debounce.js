/* 防抖函数 */

/* 要实现一个防抖函数， */

function debounce (fn, delay) {
  const self = this 
  let timer 
  return function() {
    let args = arguments
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(self, args)
    }, delay)
  }
}

/* 测试 */
function onResize(e) {
  console.log('resize');
}

window.addEventListener('resize', debounce(onResize, 1000))