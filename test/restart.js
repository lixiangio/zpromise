"use strict"

const test = require('jtf');
const timerPromise = require('../timer');

test('restart', async t => {

   let p1 = new timerPromise(3000, error => {
      t.equal('waiting timeout', error)
   })

   t.equal('pending', p1.state)

   await p1.catch(error => {
      t.equal('waiting timeout', error)
   })

   t.equal('reject', p1.state)

   p1 = p1.restart()

   await p1.catch(function () {
      t.equal('reject', p1.state)
   })

})