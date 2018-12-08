'use strict';

const timeChain = require('timechain')

const timechain = new timeChain({ delay: 0 })

class zPromise {
   /**
    * 
    * @param {Object} options
    * @param {Number} options.timeout 超时时间，单位ms
    */
   constructor(options = {}) {

      let callback

      let promise = new Promise((resolve, reject) => {
         callback = { resolve, reject }
      })

      promise.state = 'pending'

      if (options.delay) {

         let { resolve, reject, delay } = options

         promise.resolve = function (data) {
            timechain.delete(key)
            callback.resolve(data)
            promise.state = 'resolve'
         }

         promise.reject = function (data) {
            timechain.delete(key)
            callback.reject(data)
            promise.state = 'reject'
         }

         let key, value
         if (resolve) {
            key = promise.resolve
            value = resolve
         } else {
            key = promise.reject
            value = reject
         }

         timechain.set(key, value, delay)

      } else {

         promise.resolve = function (data) {
            promise.state = 'resolve'
            callback.resolve(data)
         }

         promise.reject = function (data) {
            promise.state = 'reject'
            callback.reject(data)
         }

      }

      /**
       * 基于已有配置创建新的Promise实例
       */
      promise.restart = function (newOptions) {

         return new zPromise(newOptions || options)

      }

      return promise

   }

}

module.exports = zPromise