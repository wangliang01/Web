function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}


function clone(obj) {
  // 定义一个变量来保存结果
  let res
  
  // 获取参数类型
  const type = getType(obj)
  
  switch(type) {
      // 函数
      case 'Function':
      const reg = /function\((.*)\).*\{([^\}]*)\}/
      const matches = obj.toString().match(reg)
      if (matches) {
          let [, args, functionBody] = matches
          // 对args处理成数组格式
          args = args.split(',').map(param => param.trim())
          res = new Function(...args, functionBody)
      }
      break
      // 正则
      case 'RegExp':
      res = new RegExp(obj)
      break
      // 日期
      case 'Date':
      res = new Date(obj)
      break
      // 对象
      case 'Object':
      res = Object.assign({}, obj)
      break
      // 数组
      case 'Array':
      res = [].slice.call(obj)
      // res = Array.isArray(obj) ? [] : {}
      // for (let key in obj) {
      //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
      //         res[key] = obj[key]
      //     }
      // }
      break
      // 其他类型
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

// 测试基本数据类型
console.log(clone(123));
console.log(clone(false));