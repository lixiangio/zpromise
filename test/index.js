const zPromise = require('..');

let promise = new zPromise({ time: 3000 })

console.log(promise.state)

setTimeout(() => {

   promise.resolve()
   
   console.log(promise.state)

}, 1000);