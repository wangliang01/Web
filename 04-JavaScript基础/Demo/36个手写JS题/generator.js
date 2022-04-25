function fn(num) {
  console.log(num);
  return num
}

function * gen() {
  yield fn(1)
  yield fn(2)
  return fn(3)
}

const g = gen()
console.log(g.next());
console.log(g.next());
console.log(g.next());