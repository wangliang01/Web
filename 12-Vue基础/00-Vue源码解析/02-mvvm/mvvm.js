class Mvvm {
    constructor(options) {
        this.$options = options;
        let data = this.$data = typeof options.data === 'function' ? options.data() : options.data;

        /* 数据代理 */
        this.proxyData(data);
        /* 对data作响应式处理 */
        observe(data);
    }
    proxyData(data) {
      Object.keys(data).forEach(key => {
        proxy(this, '$data', key)
      })
    }
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    let ob;
    // 是否含有__ob__属性，且__ob__是Observer的实例
    if (data.__ob__ && data.__ob__ instanceof Observer) {
        ob = data.__ob__;
    } else {
        // 将Observer的一个实例赋值给ob
        ob = new Observer(data);
    }
    return ob;
}

function def(data, key, val, enumerable = false) {
    Object.defineProperty(data, key, {
        value: val,
        configurable: true,
        enumerable,
        writable: true,
    });
}
function proxy(data, sourceKey, key) {
    return Object.defineProperty(data, key, {
        configurable: false,
        enumerable: true,
        get() {
            return data[sourceKey][key];
        },
        set(newVal) {
            data[sourceKey][key] = newVal;
        },
    });
}

function defineReactive(data, key, val) {
    let dep = new Dep();
    /* 递归监听子属性 */
    let childOb = observe(val);

    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            // 收集依赖
            if (Dep.target) {
                dep.depend()
            }
            if (childOb) {
              childOb.dep.depend()
              if (Array.isArray(val)) {
                dependArray(value)
              }
            }
            return val;
        },
        set(newVal) {
            if (val === newVal) {
                return;
            }
            console.log('set', key, newVal);
            val = newVal;
            
            childOb = observe(newVal);
            dep.notify();
        },
    });
}

class Observer {
    constructor(data) {
        // 给将当前实例赋值给__ob__
        def(data, '__ob__', this);
        /* 判断是对象还是数组 */
        if (Array.isArray(data)) {
          this.observeArray(data)
        } else {
            this.walk(data);
        }
    }
    walk(data) {
        /* 遍历数据 */
        for (let key in data) {
            defineReactive(data, key, data[key]);
        }
    }
    observeArray(data) {
      for (let item of data ) {
        observe(item)
      }
    }
}

class Dep {
  constructor() {
    this.subs = []
  }
  depend() {
    this.addSub(Dep.target)
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

class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;

        this.value = this.get();
    }
    get() {
        Dep.target = this;
        let value = this.vm[this.exp];
        Dep.target = null;
        return value;
    }
    update() {
        this.run();
    }
    run() {
        let value = this.get();
        let oldValue = this.value;
        if (value !== oldValue) {
            this.cb.call(this.vm, value, oldValue);
        }
    }
}

const vm = new Mvvm({
    data() {
        return {
            a: 1,
            b: true,
            c: undefined,
            d: {
                e: '123',
                f: [1, 2, 3],
            },
        };
    },
});

vm.a = 2

console.log(vm.d.f[2])
