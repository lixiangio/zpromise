class zPromise {
   /**
    * 
    * @param {Number} timeout 超时时间，单位ms
    */
   constructor(options = {}) {

      let { timeout, message } = options

      let callback

      let promise = new Promise((resolve, reject) => {
         callback = { resolve, reject }
      })

      promise.state = 'pending'

      if (timeout) {

         let timeId = setTimeout(() => {
            callback.reject(message || `Promise等待超过${timeout}ms`)
            promise.state = 'reject'
         }, timeout);

         promise.resolve = function (data) {
            clearTimeout(timeId)
            callback.resolve(data)
            promise.state = 'resolve'
         }

         promise.reject = function (data) {
            clearTimeout(timeId)
            callback.reject(data)
            promise.state = 'reject'
         }

      } else {

         promise.resolve = function (data) {
            callback.resolve(data)
            promise.state = 'resolve'
         }

         promise.reject = function (data) {
            callback.reject(data)
            promise.state = 'reject'
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