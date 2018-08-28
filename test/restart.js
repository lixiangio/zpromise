const test = require('jtf');
const zPromise = require('..');
const { sleep } = require('./helpers/');

test('restart', async t => {

   let p1 = new zPromise({ delay: 3000, resolve: "等待超时1" })

   t.equal('pending', p1.state);

   await p1.catch(error => {
      console.error(error)
   })

   t.equal('resolve', p1.state);

   t.equal("等待超时1", await p1);

   let p2 = p1.restart({ delay: 3000, reject: "等待超时2" })

   p2.then(value => {

   }).catch(error => {
      t.equal("等待超时2", error);
   })

   t.equal("pending", p2.state);

   setTimeout(() => {

      p2.reject(555)

      t.equal("reject", p2.state);

   }, 5000);

})