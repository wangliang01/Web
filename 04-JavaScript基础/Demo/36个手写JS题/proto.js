/* 原型链继承 */
function Animal () {
  this.colors = ['black', 'white']
}

Animal.prototype.getColor = function() {
  return this.colors
}

function Dog () {}

Dog.prototype = new Animal()

let dog1 = new Dog()

dog1.colors.push('brown')

let dog2 = new Dog()

console.log(dog2.colors)

function F() {}

F.prototype = Animal.prototype

let f = new F() 

Dog.prototype = f

// 

F.constructor = Dog 

/* 组合寄生继承 */
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog