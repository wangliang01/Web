function computedTotal () {
  let str = '0123456789'

  /* 先准备一个10k的字符串 */
  while(str.length < 1024 * 10) {
    str += str
  }

  let temp = ''

  /* 先清空缓存 */
  localStorage.clear()

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      try {
        localStorage.setItem('temp', temp)
      } catch (error) {
        const total = localStorage.getItem('temp').length / 1024 - 10 
        clearInterval(timer)
        localStorage.clear()
        resolve(total)
      }
      temp += str
    }, 0)
  })
}

(function() {
  computedTotal().then(value => {
    console.log('total', value);
  })
})()