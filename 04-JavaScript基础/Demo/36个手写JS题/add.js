function add(...args) {
  return function() {
    const newArgs = [...args, ...arguments]
    if (arguments.length === 0) {
      return newArgs.reduce((prev, cur) => prev + cur)
    } else {
      return add.apply(this, newArgs)
    }
  }
}

console.log(add(1)(2)(3)())

console.log(add(1, 2)(3)(4)())