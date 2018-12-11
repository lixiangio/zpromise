'use strict';

const timeChain = require('timechain')

const timechain = new timeChain({ delay: 0 })

class timerPromise {
   /**
    * @param {Object} options
    * @param {Number} options.timeout 超时时间，单位ms
    */
   constructor(options = {}) {

      let callback

      let promise = new Promise(function (resolve, reject) {
         callback = { resolve, reject }
      })

      let key, value

      promise.state = 'pending'

      promise.resolve = function (value) {
         callback.resolve(value)
         promise.state = 'resolve'
         timechain.delete(key)
      }

      promise.reject = function (value) {
         callback.reject(value)
         promise.state = 'reject'
         timechain.delete(key)
      }

      let { resolve, reject, delay } = options

      if (resolve) {
         key = promise.resolve
         value = resolve
      } else {
         key = promise.reject
         value = reject
      }

      timechain.set(key, value, delay)

      /**
       * 基于已有配置创建新的Promise实例
       */
      promise.restart = function (newOptions) {

         if (promise.state === 'pending') {
            promise.resolve()
         }

         return new timerPromise(newOptions || options)

      }

      promise.tasks = timechain.tasks

      return promise

   }
}

module.exports = timerPromise