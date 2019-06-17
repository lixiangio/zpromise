'use strict';

class timerPromise {
   /**
    * @param {Number} delay 超时间隔时间，单位ms
    */
   constructor(delay) {

      let callback, timeout;

      const promise = new Promise((resolve, reject) => {

         callback = { resolve, reject };

         timeout = setTimeout(() => {

            reject(new Error('waiting timeout'));

            promise.state = 'reject';

         }, delay);

      })

      promise.state = 'pending';

      promise.resolve = function (value) {

         callback.resolve(value);
         promise.state = 'resolve';
         clearTimeout(timeout);

      }

      promise.reject = function (value) {

         callback.reject(value);
         promise.state = 'reject';
         clearTimeout(timeout);
         
      }

      return promise;

   }
}

module.exports = timerPromise