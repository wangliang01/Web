class MyPromise {
    status = 'PENDING';
    value = null;
    reason = null;
    onFulfilledCallbacks = [];
    onRejectedCallbacks = [];

    constructor(executor) {
        const resolve = (value) => {
            if (this.status === 'PENDING') {
                this.status = 'FULFILLED';
                this.value = value;
                while (this.onFulfilledCallbacks.length) {
                    this.onFulfilledCallbacks.shift()(value);
                }
            }
        };

        const reject = (reason) => {
            if (this.status === 'PENDING') {
                this.status = 'REJECTED';
                this.reason = reason;
                while (this.onRejectedCallbacks.length) {
                    this.onRejectedCallbacks.shift()(reason);
                }
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onFulfilled, onRejected) {
        // 判空处理
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (reason) => {
                      throw reason;
                  };

        // 返回一个promise

        let promise2 = new MyPromise((resolve, reject) => {
            // 成功的回调方法
            const fulfilledMicroTask = () => {
                queueMicrotask(() => {
                    try {
                        const x = onFulfilled(this.value);
                        this._resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            };
            // 失败的回调方法
            const rejectedMicroTask = () => {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason);
                        this._resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            };

            if (this.status === 'FULFILLED') {
                fulfilledMicroTask();
            } else if (this.status === 'REJECTED') {
                rejectedMicroTask();
            } else if (this.status === 'PENDING') {
                this.onFulfilledCallbacks.push(fulfilledMicroTask);
                this.onRejectedCallbacks.push(rejectedMicroTask);
            }
        });

        return promise2;
    }
    catch(onRejected) {
        this.then(null, onRejected);
    }
    _resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject(new TypeError('循环引用'));
        }
        // x是除了null以外的对象或者函数
        if (x != null && (typeof x === 'object' || typeof x === 'function')) {
            let called; //防止成功后调用失败
            try {
                //防止取then是出现异常  object.defineProperty
                let then = x.then; //取x的then方法 {then:{}}
                if (typeof then === 'function') {
                    //如果then是函数就认为他是promise
                    //call第一个参数是this，后面的是成功的回调和失败的回调
                    then.call(
                        x,
                        (y) => {
                            //如果Y是promise就继续递归promise
                            if (called) return;
                            called = true;
                            resolvePromise(promise2, y, resolve, reject);
                        },
                        (r) => {
                            //只要失败了就失败了
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    );
                } else {
                    //then是一个普通对象，就直接成功即可
                    resolve(x);
                }
            } catch (e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            //x = 123 x就是一个普通值 作为下个then成功的参数
            resolve(x);
        }
    }

    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            resolve(value);
        });
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                return promises[i].then(resolve, reject);
            }
        });
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const res = [];
            for (let i = 0; i < promises.length; i++) {
                promises[i].then((value) => {
                    res.push(value);
                    if (res.length === promises.length) {
                        resolve(res);
                    }
                }, reject);
            }
        });
    }
}

MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });

    return dfd;
};

MyPromise.resolve()
    .then(() => {
        console.log(0);
        return MyPromise.resolve(4);
    })
    .then((res) => {
        console.log(res);
    });

MyPromise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });
