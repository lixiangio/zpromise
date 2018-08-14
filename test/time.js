const zPromise = require('..');

async function run(params) {

   let promise = new zPromise(3000)

   console.log(promise.state)
   
   // promise.resolve()

   // setTimeout(() => {

   // }, 50000);

   await promise

   console.log(promise.state)

}

run()