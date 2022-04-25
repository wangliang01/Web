Array.prototype._every = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false
    }
  }
  return true
}



const arr = [1, 2, 3]

arr._every((item, index) => {
  console.log(item, index);
  if (item > 0) {
    return true
  }
})