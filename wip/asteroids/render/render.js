import time from '../time/time.js'
import objects from '../objects/objects.js'

/**
 * The render module delegates rendering low-level components to another
 * render modules, like renderImage, depending on the type of the component.
 */

class Render {
  constructor(time) {
    this.map = new Map()
    time.step(_ => {
      // TODO traverse objects in a hierarchy (maybe in other module) and render things.

      // space requires this module with its render method?
      // ^whatever the module that does the component tree is (maybe yet another module
      // maybe this is even a module that extends Prototype)
    }, -1)
  }

  set(type, renderer) {
    this.map.set(type, renderer)
  }
}

export default {
  name: 'render',
  require: [time, objects],
  define: ['Render'],
  initialize(library) {
    library.Render = new Render(library.Time)
  },
}


// export default {
//  name: 'renderImage',
//  extend: ['Render'],
//  initialize(library) {
//    library.Render.set(Image, image => /*render here*/image)
//  },
// }