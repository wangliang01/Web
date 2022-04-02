
const isRegExp = (value) => Object.prototype.toString.call(value).slice(8, -1) === 'RegExp'

const isDate = value => Object.prototype.toString.call(value).slice(8, -1) === 'Date'

function cloneDeep (value) {
  if (typeof value !== 'object') {
    return value
  }
  /* 对null的处理 */
  if (value === null) return null
  /* 对正则的处理 */
  if (isRegExp(value)) {
    return new RegExp(value)
  }
  /* 对日期的处理 */
  if (isDate(value)) {
    return new Date(value)
  }
  const res = Array.isArray(value) ? [] : {}

  const map = new Map()

  for (let key in value) {
    /* 先判断map中是否存在key, 如果存在，则直接从map从获取 */
    if (map.get(key)) {
      return map.get(key)
    }
    /* 不存在，则递归处理 */
    map.set(key, value[key])
    res[key] = cloneDeep(value[key])
  }

  return res
}


/* 
测试
1、测试基本数据类型
2、测试对象，数组
3、测试函数
4、测试正则
5、测试日期
6、测试循环引用 
*/

var obj = {
  a: 1,
  b: null,
  c: {
    d: 2,
    e: [1, 2, 3]
  },
  f: function() {},
  g: /123/,
  h: new Date(),
  i: {}
}

obj.i.c = obj.c

console.log(cloneDeep(obj))

const cloneObj = cloneDeep(obj)

cloneObj.c.d = 1 

console.log(obj.c.d, cloneObj.c.d);