class zPromise {
   /**
    * 
    * @param {Number} time 超时时间，单位ms
    */
   constructor(time) {

      let callback

      let promise = new Promise((resolve, reject) => {
         callback = { resolve, reject }
      })

      promise.state = 'pending'

      if (time) {

         let timeId = setTimeout(() => {
            callback.reject(`Promise等待超过${time}ms`)
            promise.state = 'reject'
         }, time);

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

      return promise

   }

}

module.exports = zPromise