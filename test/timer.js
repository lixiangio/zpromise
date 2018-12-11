'use strict';

const test = require('jtf');
const timerPromise = require('../timer');
const { sleep } = require('./helpers/');

test('resolve', async t => {

   let promise = new timerPromise({
      delay: 2000,
      resolve: { a: 1 }
   })

   t.deepEqual('pending', promise.state)

   await sleep(1000)

   t.deepEqual('pending', promise.state)

   await sleep(3000)

   t.deepEqual('resolve', promise.state)

})

test('reject', async t => {

   let promise = new timerPromise({
      delay: 2000,
      reject: '等待超时'
   })

   promise.catch(function (error) {

   })

   t.deepEqual('pending', promise.state)

   await sleep(1000)

   t.deepEqual('pending', promise.state)

   await sleep(2000)

   t.deepEqual('reject', promise.state)

})