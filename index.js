'use strict';

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

         let state, value
         if (resolve === undefined) {
            state = 'reject'
            value = reject
         } else {
            state = 'resolve'
            value = resolve
         }

         let timeout = setTimeout(() => {
            callback[state](value)
            promise.state = state
         }, delay)

         promise.resolve = function (data) {
            clearTimeout(timeout)
            callback.resolve(data)
            promise.state = 'resolve'
         }

         promise.reject = function (data) {
            clearTimeout(timeout)
            callback.reject(data)
            promise.state = 'reject'
         }

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

         if (promise.state === 'pending') {
            return promise
         } else {
            return new zPromise(newOptions || options)
         }

      }

      return promise

   }

}

module.exports = zPromise