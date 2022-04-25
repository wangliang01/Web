Array.prototype._filter = function(callback) {
  const res = []
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      res.push(callback(this[i], i, this))
    }
  }
  return res
}