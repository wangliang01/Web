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

const muti = curry(mutiFn)

console.log(muti(1)(2)(3)())