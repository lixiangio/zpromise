'use strict';

class timerPromise {
   /**
    * @param {Number} delay 超时间隔时间，单位ms
    */
   constructor(delay, catchFunc) {

      let callback, timeout

      let promise = new Promise((resolve, reject) => {

         callback = { resolve, reject }

         timeout = setTimeout(() => {

            reject('waiting timeout')

            promise.state = 'reject'

         }, delay)

      }).catch(function (error) {

         if (catchFunc) {
            catchFunc(error)
         }

      })



      promise.state = 'pending'

      promise.resolve = function (value) {
         callback.resolve(value)
         promise.state = 'resolve'
         clearTimeout(timeout)
      }

      promise.reject = function (value) {
         callback.reject(value)
         promise.state = 'reject'
         clearTimeout(timeout)
      }

      /**
       * 解除并创建新的Promise实例
       */
      promise.restart = function () {

         if (promise.state === 'pending') {
            promise.resolve()
         }

         return new timerPromise(delay, catchFunc)

      }

      return promise

   }
}

module.exports = timerPromise