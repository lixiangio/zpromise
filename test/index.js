'use strict';

const test = require('jtf');
const zPromise = require('..');

test('resolve', async t => {

   const zpromise = new zPromise()

   zpromise.then(function () {
      t.deepEqual('resolve', zpromise.state)
   }).catch(function () {
      t.deepEqual('reject', zpromise.state)
   })

   zpromise.resolve()

   t.deepEqual('resolve', zpromise.state)

})


test('reject', async t => {

   const zpromise = new zPromise()

   zpromise.catch(function () {

      t.deepEqual('reject', zpromise.state)

   })

   zpromise.reject(111)

   t.deepEqual('reject', zpromise.state)

   let  result = await zpromise.catch(function (error) {

      return error
      
   })

   t.deepEqual(111, result)

})