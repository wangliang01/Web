function curry(fn, args) {
  var args = args || []

  return function() {
    let newArgs = args.concat([...arguments])
    if (args.length < newArgs.length) {
      return curry.call(this, fn, newArgs)
    } else {
      return fn.apply(this, newArgs)
    }
  }
}

const mutiFn = function(...args) {
  return args.reduce((total, item) => total + item, 0)
}

// const muti = curry(mutiFn)

// console.log(muti(1)(2)(3)())


Function.prototype.curry = function(...args) {
  const fn = this
  return function() {
    let newArgs = args.concat([...arguments])
    if (args.length < newArgs.length) {
      return fn.curry.apply(fn, newArgs)
    } else {
      return fn.apply(this, newArgs)
    }
  }
}


function curry2(fn, args) {
  const length = fn.length 
  args = args || []
  return function() {
    const newArgs = args.concat([...arguments])
    if (newArgs.length < length) {
      return curry2.call(this, fn, newArgs)
    } else {
      return fn.apply(this, newArgs)
    }
  }
}

function threeAddSumFn(a, b, c) {
  return a + b + c
}

const threeAdd = curry2(threeAddSumFn)

console.log(threeAdd(1)(2)(3));






console.log(mutiFn.curry(1)(2)(3)(4))