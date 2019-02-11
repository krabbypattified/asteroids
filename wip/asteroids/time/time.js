import context from '../context/context.js'

/**
 * This module controls the game loop.
 */

class Time {
  constructor({ Context }) {
    this.Context = Context
    this.callbacks = []
    this.frame = -1
    window.requestAnimationFrame(this._step.bind(this))
  }

  _step(timestamp) {
    this.Context.save()
    this.frame++
    for (const callback of this.callbacks.reverse().flat()) callback(timestamp)
    window.requestAnimationFrame(this._step.bind(this))
    this.Context.restore()
  }

  step(callback, priority = 0) {
    if (!this.callbacks[priority]) this.callbacks[priority] = []
    this.callbacks[priority].push(callback)
  }
}

export default {
  name: 'time',
  require: [context],
  define: ['Time'],
  initialize(library) {
    library.Time = new Time(library)
  }
}