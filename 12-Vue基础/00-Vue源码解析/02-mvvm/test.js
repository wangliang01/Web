let obj = {}

let song = '发如雪'

obj.singer = '周杰伦'

Object.defineProperty(obj, 'music', {
  configurable: true,
  enumerable: true,
  // value: '七里香',
  get() {
    return song 
  },
  set(val) {
    song = val
  }
})

console.log(obj)

delete obj.music

console.log(obj)

obj.music = '听妈妈的话'

console.log(obj)

for (let key in obj) {
  console.log(key)
}