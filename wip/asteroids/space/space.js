import context from '../context/context.js'
import time from '../time/time.js'

/**
 * This module maps 2D world coordinates to the canvas.
 * Space is initially the same as canvas space.
 * It can be transformed.
 */

class Space {
    constructor({ Context, Time }) {
      this.Context = Context
      this.Time = Time
    }

    transform({ a, b, c, d, e, f }) {
      this.Time.step(_ => {
        this.Context.transform(a, b, c, d, e, f)
      })
    }
  }
  
export default {
  name: 'camera',
  require: [context, time],
  define: ['Space'],
  initialize(library) {
    library.Space = new Space(library)
  }
}