Function.prototype._bind = function(context = window || global) {
  const fn = this

  const args = [...arguments].slice(1)

  const resFn = function() {
    return fn.apply(this instanceof resFn ? this: context, [...args, ...arguments])
  }

  resFn.prototype = Object.create(this.prototype)

  return resFn
}