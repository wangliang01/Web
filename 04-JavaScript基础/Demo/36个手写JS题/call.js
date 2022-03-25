Function.prototype._call = function(context = window || global) {
  context.fn = this 
  const args = [...arguments].slice(1)
  const res = context.fn(args)
  delete context.fn 
  return res
}

function alertAge() {
  console.log(this.age);
}

const person = {
  name: 'wl',
  age: 18
}

alertAge._call(person)

