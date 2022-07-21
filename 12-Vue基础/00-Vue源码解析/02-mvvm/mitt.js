var data = {name: 'kindeng'}

console.log(data) 

data.name = 'qqq'

function observe(data) {
  if (!data && typeof data !== 'object') {
    return 
  }


  Object.keys().forEach(key => {

    defineReactive(data, key, )
  })
}


function defineReactive(data, key, val) {
  const dep = new Dep()
  observe(val)

  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      // 收集依赖
      return val
    },
    set(newVal) {
      if (val === newVal) {
        // 当值没有变化，则不作处理
        return 
      }
      val = newVal 
      // 通知更新
      dep.notify()
    }
  })
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

class Watch {
  constructor(vm, exp, cb) {
    this.vm = vm 
    this.exp = exp 
    this.cb = cb 
    // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解。
    this.value = this.get()
  }
  get() {
    Dep.target = this 
    let value = this.vm[exp]
    Dep.target = null
    return value
  }
  update() {
    this.run()
  }
  run() {
    let value = this.get() 
    let oldValue = this.value 
    if (value !== oldValue) {
      this.value = value 
      this.cb.call(this.vm, value, oldValue)
    }
  }
}

function proxyData(data, sourceKey, key) {
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: true,
    get() {
      return data[sourceKey][key]
    },
    set(newVal) {
      data[sourceKey][key] = newVal
    }
  })
}