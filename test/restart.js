const zPromise = require('..');

async function run(params) {

   let p1 = new zPromise({ time: 3000, message: "等待超时1" })

   console.log(p1.state)

   // setTimeout(() => {
   //    p1.resolve()
   // }, 5000);

   await p1.catch(message => {
      console.error(message)
   })

   console.log(p1.state)

   let p2 = p1.restart({ time: 3000, message: "等待超时2" })

   p2.then(message => {
      console.error(message, 'then')
   }).catch(message => {
      console.error(message, 'catch')
   })

   console.log(p2.state)

   setTimeout(() => {

      p2.reject(555)

      console.log(p2.state)
      
   }, 5000);

}

run()