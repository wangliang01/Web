function throttle (fn, delay) {
  let timer = null 
  return function() {
    let self = this 
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(self, arguments)
        timer = null
      }, delay)
    }
  }
}

/* 
  时间戳
*/

function throttle(fn, delay)  {
  let startTime = Date.now()
  return function() {
    let endTime = Date.now()
    if (endTime - startTime > delay) {
      fn.apply(this, arguments)
      startTime = Date.now()
    }
  }
}