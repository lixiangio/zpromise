const test = require('jtf');
const zPromise = require('..');
const { sleep } = require('./helpers/');

test('time', async t => {

   let promise = new zPromise({ timeout: 3000 })

   promise.catch(message => {

   })

   await promise.catch(message => {
      t.equal(undefined, message);
   })

   t.equal("reject", promise.state);

   await sleep(1000)

   promise.reject(666)

})