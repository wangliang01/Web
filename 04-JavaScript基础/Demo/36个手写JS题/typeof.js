function myTypeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

// 测试

console.log(myTypeof([]));
console.log(myTypeof(1));
console.log(myTypeof(new Date()));
