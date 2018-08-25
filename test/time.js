const test = require('jtf');
const zPromise = require('..');
const { sleep } = require('./helpers/');

test('time', async t => {

   let promise = new zPromise({
      timeout: 3000,
      resolve: { a: 1 },
      // reject: '等待超时'
   })

   setTimeout(() => {

      // promise.resolve()

   }, 1000);

   let result = await promise.catch(error => {
      console.error(error)
   })

   t.deepEqual({ a: 1 }, result);

})