const zPromise = require('..');

let promise = new zPromise()

console.log(promise.state)

setTimeout(() => {
   promise.resolve()
   console.log(promise.state)
}, 1000);