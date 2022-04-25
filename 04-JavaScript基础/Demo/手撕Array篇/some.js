Array.prototype._some = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true
    }
  }
  return false
}


const arr = [1, 2, 3, 4]

arr._some((item, index) => {
  console.log(item);
  if (item > 2) {
    return true
  }

})