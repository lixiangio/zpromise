## Install

```
npm install zpromise
```

## 特性

* 消除Promise注入函数，可通过Promise实例直接访问resolve()或reject()

* 支持获取当前Promise实例状态

* 支持Promise超时触发reject()

* 支持Promise快速解除、重置

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

   let promise = new timerPromise(3000)

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
const restartPromise = require('zpromise/restart');

async function run(params) {

   let p1 = new restartPromise(3000 , error => {
      console.warn('等待超时')
   })

   await p1.catch(error => {
      console.error(error)
   })

   let p2 = p1.restart()

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

### timerPromise(delay, catchFunc)

> 在zPromise基础上增加了定时器功能，在等待超时后自动调用预设的reject()或resolve()，原型属性与zPromise一致。

* `delay` *Number* 超时时间，单位ms，可选

* `catchFunc` *Function* 异常捕获回调函数

#### restartPromise.prototype.restart()

重置Promise，将原来的Promise改为resolve状态，并使用之前的配置项创建新的Promise实例