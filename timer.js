'use strict';

class timerPromise {
   /**
    * @param {Object} options
    * @param {Number} options.delay 超时间隔时间，单位ms
    */
   constructor(options = {}) {

      let callback, timeout

      let promise = new Promise((resolve, reject) => {

         callback = { resolve, reject }

         timeout = setTimeout(() => {

            if (options.resolve) {
               resolve(options.resolve)
               promise.state = 'resolve'
            } else {
               reject(options.reject)
               promise.state = 'reject'
            }

         }, options.delay);
         
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
       * 基于上一个配置创建新的Promise实例
       */
      promise.restart = function () {

         if (promise.state === 'pending') {
            promise.resolve()
         }

         return new timerPromise(options)

      }

      return promise

   }
}

module.exports = timerPromise