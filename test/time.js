const zPromise = require('..');

async function run() {

   let promise = new zPromise({
      time: 3000,
      message: "等待超时"
   })

   setTimeout(() => {
      
      // promise.resolve()

   }, 1000);

   await promise.catch(message => {
      console.error(message)
   })

}

run()