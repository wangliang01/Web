Array.prototype._reduce = function(callback, initinialValue) {
  let prev, index
  prev = initinialValue === undefined ? this[0] : initinialValue
  index = initinialValue === undefined ? 1 : 0
  for (let i = index; i < this.length; i++) {
    prev = callback(prev, this[indexedDB], i, this)
  }
  return prev
}


var arr = [1, 2, 3]

console.log(arr.reduce((prev, cur) => prev + cur))