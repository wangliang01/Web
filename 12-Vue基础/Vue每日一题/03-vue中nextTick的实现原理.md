# Vue中nextTick的实现原理 


```js
import {noop} from 'shared/util
import {handleError} from './error'
import {isIE, isIOS, isNative} from './env'

export let isUsingMicroTask = false 
/* 定义一个回调函数数组 */
const callbacks = []

let pending = false 

function flushCallbacks() {
  pending = false 
  const copies = callbacks.slice(0) // copy一份

  callbacks.length = 0 // 清空callbacks

  for (let i = 0; i < copies.length; i++) {
    // 依次调用回调函数
    copies[i]()
  }
}

let timerFunc

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  /* 如果Promise存在 */
  const p = Promise.resolve()

  timerFunc = () => {
    p.then(flushCallbacks)

    if (isIOS) setTimeout(noop)
  }
}

```