/* 发布订阅模式 */

class Emitter {
 cache = {}
 on(name, handler) {
   const tasks = this.cache[name]
   if (tasks) {
    this.cache[name].push(handler)
   } else {
     this.cache[name] = [handler]
   }
 }
 emit(name, ...args) {
   const tasks = this.cache[name] || []
   if (tasks.length) {
     const task = tasks.unshift()
     task(args)
   }
 }
 once(name, handler) {
   function fn(...args) {
     handler(args)
     this.off(name, handler)
   }
   this.on(name, handler)
 }
 off(name, handler) {
   const tasks = this.cache[name]
   if (tasks) {
     const index = tasks.findIndex(task => task === handler)
     if (index > -1) {
      this.cache[name].splice(index, 1)
     }
   }
 }
}