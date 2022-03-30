function _instanceOf(target, constructor) {
  let proto = target.__proto__ 

  while (proto) {
    if (proto === constructor.prototype) {
      return true
    } 
    proto = proto.__proto__ 
  }

  return false
}


const person = {}

console.log(_instanceOf(person, Object))


