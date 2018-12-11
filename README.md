## Install

```
npm install zpromise
```

## 特性

* 消除Promise注入函数，可通过Promise实例直接访问resolve()或reject()

* 支持获取当前Promise实例状态

* 支持Promise超时触发resolve()或reject()

* 支持Promise重启，可复用配置项

## 示例

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
const timerPromise = require('zpromise/timer');

async function run(params) {

   let promise = new timerPromise({ delay: 3000, reject: "等待超时" })

   console.log(promise.state)
   
   await promise.catch(error => {
      console.error(error)
   })

   console.log(promise.state)

}

run()
```


#### 重置

```js
const timerPromise = require('zpromise/timer');

async function run(params) {

   let p1 = new timerPromise({ delay: 3000, resolve: { a: 1 } })

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


## API

### zPromise()

> Promise简化包装，提供resolve、reject绑定和状态查询

#### zPromise.prototype.state

Promise实例状态，包含pending、resolve、reject三种状态

#### zPromise.prototype.resolve(data)

对应Promise注入函数中的resolve()

#### zPromise.prototype.reject(error)

对应Promise注入函数中的reject()

### timerPromise(options)

> 在zPromise基础上增加了定时器功能，在等待超时后自动调用预设的reject()或resolve()，原型属性与zPromise一致。

* `options` *Object* 配置选项

   * `delay` *Number* 超时时间，单位ms，可选

   * `reject` * reject超时返回值，默认

   * `resolve` * resolve超时返回值

#### timerPromise.prototype.restart(options)

* options 与zPromise创建实例时的参数一样

restart()仅在promise处于非pending状态时重启，pending状态下还是返回原来的promise。

重启promise实际上是基于已有配置创建新的Promise实例，目的是为使配置项可复用和可迭代。
