'use strict';

class restartPromise {
   /**
    * @param {Number} delay 超时间隔时间，单位ms
    * @param {Function} catchFunc catch回调函数
    */
   constructor(delay, catchFunc) {

      let callback, timeout

      const promise = new Promise((resolve, reject) => {

         callback = { resolve, reject }

         timeout = setTimeout(() => {

            reject('waiting timeout')

            promise.state = 'reject'

         }, delay)

      }).catch(catchFunc)

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

         return new restartPromise(delay, catchFunc);

      }

      return promise;

   }
}

module.exports = restartPromise;