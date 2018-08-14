<!-- Promise简化包装器，用于增强已有Promise易用性 -->

## 特性

* 消除Promise注入函数，直接在Promise实例上暴露resolve()和reject()即可实现状态管理

* 提供state属性获取当前promise状态

* 支持promise等待超时

## 示例

```js
const zPromise = require('zpromise');

let promise = new zPromise()

console.log(promise.state)

setTimeout(() => {
   
   promise.resolve()

   // promise.reject()

   console.log(promise.state)

}, 1000);
```

## 超时示例

```js
const zPromise = require('zpromise');

async function run(params) {

   let promise = new zPromise(3000)

   console.log(promise.state)
   
   await promise

   console.log(promise.state)

}

run()
```


## API

### zPromise(time)

* time 时间，单位ms

### this.state

当前promise状态，值分别为pending、resolve、reject

### this.resolve()

代理Promise注入函数中的resolve，成功时执行

### this.reject()

代理Promise注入函数中的reject，失败时执行