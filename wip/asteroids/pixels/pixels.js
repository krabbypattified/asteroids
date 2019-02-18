import context from '../context/context.js'

/**
 * This module adds sugar to HTMLImageElement and defines its render method.
 */

export default {
  name: 'pixels',
  require: [context],
  define: ['Pixels'],
  initialize(library) {
    const { Context } = library

    library.Pixels =     class Pixels {
      constructor(uri) {
        this.load = new Promise((resolve, reject) => {
          this.image = new Image()
          this.image.addEventListener('load', _ => resolve(this.image))
          this.image.addEventListener('error', _ => reject(new Error(`Failed to load image at ${this.image.src}`)))
          this.image.src = uri
        })
      }
    
      render() {
        Context.drawImage(this.image, 0 , 0)
      }
    }
  },
}