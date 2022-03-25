Function.prototype._apply = function(context = window || global) {
  context.fn = this 
  const args = arguments[1]

  /* 如果有参数 */ 
  let res 
  if (args) {
    res = context.fn(...args)
  } else {
    res = context.fn()
  }

  delete context.fn 
  return res
}

function log(name, age) {
  console.log(name, age);
} 

const person = {
  name: '小张',
  age: 29
}

log._apply(person, [person.name, person.age])