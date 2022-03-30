function New (fn) {
  const obj = {}
  obj.__proto__ = fn.prototype 
  fn.apply(obj, [...arguments])
  return obj
}