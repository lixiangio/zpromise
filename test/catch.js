const zPromise = require('..')

let promise = new zPromise({ time: 3000 })

promise.catch(message => {

   console.error(message)

})

async function run() {

   await promise.catch(message => {
      console.error(message)
   })

   console.log(9999)

}

setTimeout(() => {

   promise.reject(666)

}, 1000);

run()