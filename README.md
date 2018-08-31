<!-- Promise简化包装器，用于增强已有ES6 Promise的易用性 -->

### Install

```
npm install zpromise
```

### 特性

* 消除Promise注入函数，直接在Promise实例上调用resolve和reject方法进行状态管理

* 支持Promise超时触发resolve或reject，解除无限等待

* 支持获取当前Promise实例状态

* 支持Promise重启，可复用配置项

### 示例

```js
const zPromise = require('zpromise');

async function () {

   let promise = new zPromise()

   setTimeout(() => {

      if (error) {
         promise.reject(error)
      } else {
         promise.resolve(data)
      }

   }, 1000);

   await promise.catch(error => {
      console.error(error)
   })

}
```

#### 超时

```js
const zPromise = require('zpromise');

async function run(params) {

   let promise = new zPromise({ delay: 3000, reject: "等待超时" })

   console.log(promise.state)
   
   await promise.catch(error => {
      console.error(error)
   })

   console.log(promise.state)

}

run()
```


#### 重启

```js
const zPromise = require('zpromise');

async function run(params) {

   let p1 = new zPromise({ delay: 3000, resolve: { a: 1 } })

   await p1.catch(error => {
      console.error(error)
   })

   let p2 = p1.restart({ delay: 2000, reject: new Error("等待超时") })

   p2.then(data => {
      console.error(data)
   }).catch(error => {
      console.error(error)
   })

   setTimeout(() => {

      p2.reject()
      
   }, 1000);

}

run()
```


### API

#### zPromise(options)

* `options` *Object* 配置选项

   * `delay` *Number* 超时时间，单位ms，可选

   * `reject` * reject超时返回值，默认

   * `resolve` * resolve超时返回值

#### this.state

当前promise状态，值分别为pending、resolve、reject

#### this.resolve(data)

* data 成功返回值

代理Promise注入函数中的resolve，成功时执行

#### this.reject(error)

* error 失败返回值

代理Promise注入函数中的reject，失败时执行

#### this.restart(options)

* options 与zPromise创建实例时的参数一样

restart()仅在promise处于非pending状态时重启，pending状态下还是返回原来的promise。

重启promise实际上是基于已有配置创建新的Promise实例，目的是为使配置项可复用和可迭代。
