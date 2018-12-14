'use strict';

class zPromise {
   constructor() {

      let callback

      let promise = new Promise(function (resolve, reject) {
         callback = { resolve, reject }
      })

      promise.state = 'pending'

      promise.resolve = function (data) {
         promise.state = 'resolve'
         callback.resolve(data)
      }

      promise.reject = function (data) {
         promise.state = 'reject'
         callback.reject(data)
      }

      return promise

   }
}

module.exports = zPromise