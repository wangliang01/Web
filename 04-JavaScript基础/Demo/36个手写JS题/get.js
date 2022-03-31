function get(source, path, defaultValue) {
  // 将数组格式的路径转化成dot格式的，再拆分成key数组
  // a[0].b -> a.0.b -> ['a', '0', 'b']
    const keyList = path.replace(/\[(\d+)\]/g, '.$1').split('.')

    const result = keyList.reduce((obj, key) => {
      // null 与 undefined 取属性会报错, 用Object包装一下
      return Object(obj)[key]
    }, source)

    return result === undefined ? defaultValue : result
}


obj = {
  a: {
    b: 123
  },
  c: [1, 2, 3]
}

get(obj, 'c[2]')

