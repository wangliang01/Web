class Person {
  constructor() {
    this.callbacks = []
  }
  init(name) {
    this.callbacks.push(() => {
      console.log(`Hi! This is ${name}`)
    })
    setTimeout(() => {
      while(this.callbacks.length) {
        const callback = this.callbacks.splice(0, 1)[0]
        callback && callback()
      }
    })
    return this
  }
  sleep(time) {
    this.callbacks.push(() => {
      let startTime = Date.now()
      let endTime = Date.now()
      while(endTime - startTime < time) {
        endTime = Date.now()
      }
      console.log(`Wake up after ${time}`);
    })
    return this
  }
  eat(food) {
    this.callbacks.push(() => {
      console.log(`Eat ${food}`);
    })
    return this
  }
  sleepFirst(time) {
    this.callbacks.unshift(() => {
      let startTime = Date.now()
      let endTime = Date.now()
      while(endTime - startTime < time) {
        endTime = Date.now()
      }
      console.log(`Wake up after ${time}`);
    })
    return this
  }
}

const man = new Person()

const LazyMan = man.init.bind(man)

LazyMan('Hank').eat('dinner').eat('supper').sleepFirst(500)