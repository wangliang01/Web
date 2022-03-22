function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}
function cloneDeep (obj, hash = new Map()) {
  const type = getType(obj)
  if (obj === null || obj === undefined) return obj
  if (typeof obj !== 'object') return obj
  if (type === 'Date') return new Date(obj)
  if (type === 'RegExp') return new RegExp(obj)

  let val = hash.get(obj)
  if (val) {
    return val
  }

  // 获取传入对象/方法的构造函数
  let cloneObj = new obj.constructor()

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = cloneDeep(obj[key], hash)
      hash.set(key, cloneObj[key])
    }
  }

  return cloneObj
}


// 测试
let obj = {
  a: 1, 
  b: false,
  c: [1, 2, 3],
  d: {
    name: 'xi',
    age: 18
  },
  e: function() {
    return this.d
  },
  f: new Date(),
  g: /123/
}

// obj.d.name = obj.d

console.log(cloneDeep(obj))