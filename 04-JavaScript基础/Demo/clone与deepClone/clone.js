function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}


function clone (obj) {
  const type = getType(obj)

  let res 
 
  switch(type) {
    /* 如果obj是函数 */
    case 'Function': 
    const reg = /function\((.*)\).*\{([^\}]*)\}/
    const matches = obj.toString().match(reg)
    let params = matches[1]?.split(', ') || null
    let functionBody = matches[2]
    if (params) {
      res = new Function(...params, functionBody)
    } else {
      res = new Function(functionBody)
    }

    
    break;
    /* 如果obj是正则 */
    case 'RegExp':
      res = new RegExp(obj)
      break;
      /* 如果obj是日期 */
    case 'Date':
      res = new Date(obj)
      break;
    
      /* 如果是普通对象 */
    case 'Object':
    case 'Array':
      res = Array.isArray(obj) ? [] : {}
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          res[key] = obj[key]
        }
      }
      break;
      /* 如果obj是基本数据类型 */
      default:
        res = obj
  }
  return res
}


// 测试Array
let arr = [1, 2, 3, 4]
console.log(clone(arr))

// 测试Object
let obj = {name: '张三', age: 28}

console.log(clone(obj));

// 测试Function
let fn = function(a, b) {
  console.log('HaHa')
  return a + b
}

console.log(clone(fn)(2, 3));

// 测试RegExp
let reg = /123/
console.log(clone(reg));

// 测试Date
let date = new Date()

console.log(clone(date));