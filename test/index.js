'use strict';

const test = require('jtf');
const zPromise = require('..');
const { sleep } = require('./helpers/');

test('reject', async t => {

   let promise = new zPromise({ delay: 2000, reject: '等待超时' })

   promise.catch(function (error) {

   })

   t.deepEqual('pending', promise.state)

   await sleep(1000)
   
   t.deepEqual('pending', promise.state)

   await sleep(3000)

   t.deepEqual('reject', promise.state)

})


test('resolve', async t => {

   let promise = new zPromise({ delay: 2000, resolve: { a: 1 } })

   t.deepEqual('pending', promise.state);

   await sleep(1000)

   t.deepEqual('pending', promise.state);

   await sleep(2000)

   t.deepEqual('resolve', promise.state);

})