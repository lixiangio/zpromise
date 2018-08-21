<!-- Promise简化包装器，用于增强已有ES6 Promise的易用性 -->

### Install

```
npm install zpromise
```

### 特性

* 消除Promise注入函数，直接在Promise实例上调用resolve和reject方法进行状态管理

* 支持Promise超时触发reject，解除无限等待

* 支持获取Promise实例当前状态

* 支持Promise重启，可复用配置项

### 示例

```js
const zPromise = require('zpromise');

let promise = new zPromise()

setTimeout(() => {
   
   promise.resolve()

}, 1000);
```

#### 超时

```js
const zPromise = require('zpromise');

async function run(params) {

   let promise = new zPromise({ timeout: 3000, message: "等待超时" })

   console.log(promise.state)
   
   await promise.catch(message => {
      console.error(message)
   })

   console.log(promise.state)

}

run()
```


#### 重启

```js
const zPromise = require('zpromise');

async function run(params) {

   let p1 = new zPromise({ time: 3000, message: "等待超时1" })

   await p1.catch(message => {
      console.error(message)
   })

   let p2 = p1.restart({ time: 3000, message: "等待超时2" })

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

   * `timeout` *Number* 超时时间，单位ms，可选

   * `message` *String* 超时描述信息，可选

#### this.state

当前promise状态，值分别为pending、resolve、reject

#### this.resolve()

代理Promise注入函数中的resolve，成功时执行

#### this.reject()

代理Promise注入函数中的reject，失败时执行

#### this.restart(options)

* options 与zPromise创建实例时的参数一样

restart()仅在promise处于非pending状态时重启，pending状态下还是返回原来的promise。

重启promise实际上是基于已有配置创建新的Promise实例，目的是为使配置项可复用和可迭代。
