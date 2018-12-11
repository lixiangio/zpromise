"use strict"

const test = require('jtf');
const timerPromise = require('../timer');

test('restart', async t => {

   let p1 = new timerPromise({
      delay: 3000,
      resolve: "等待超时"
   })

   t.equal(p1.state, 'pending')

   let result = await p1.then(result => {
      t.equal(result, "等待超时")
      return result
   })

   t.equal(result, "等待超时");

   t.equal(p1.state, 'resolve');

   p1 = p1.restart({
      delay: 2000,
      reject: "等待超时"
   })

   p1.catch(error => {
      t.equal(error, "等待超时")
   })

   p1 = p1.restart()

   await p1.catch(error => {
      t.equal(error, "等待超时")
   })

})