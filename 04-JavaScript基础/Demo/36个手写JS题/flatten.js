const isObject = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
}

const isArray = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Array'
}


// console.log(isObject(false));

/* 
flatten

const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }

{
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'b[0]': 1,
  'b[1]': 3,
  'b[2].a': 2,
  'b[2].b': 3
   c: 3
 }


*/

function flatten(value) {
  const res = {}
  const dfs = (cur, prefix = '')=> {
    if (isArray(cur)) {
      cur.forEach((item, index) => {
        dfs(item, `${prefix}[${index}]`)
      })
    }else if (isObject(cur)) {
      for (let key in cur) {
        dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`)
      }
    } else {
      res[prefix] = cur
    }

  }

  dfs(value)

  return res
}

const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }

 console.log(flatten(obj))
