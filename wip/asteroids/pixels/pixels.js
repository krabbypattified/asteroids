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

    const polyfillMatrix = Boolean(Context.currentTransform)
    const getMatrix = _ => polyfillMatrix ? Context.currentTransform : [Context.mozCurrentTransform].map(([a,b,c,d,e,f]) => ({a,b,c,d,e,f}))[0]
    const setMatrix = ({a,b,c,d,e,f}) => polyfillMatrix ? Context.currentTransform = arguments[0] : Context.mozCurrentTransform = [a,b,c,d,e,f]

    library.Pixels = class Pixels {
      constructor(uri) {
        this.load = new Promise((resolve, reject) => {
          this.image = new Image()
          this.image.addEventListener('load', _ => resolve(this.image))
          this.image.addEventListener('error', _ => reject(new Error(`Failed to load image at ${this.image.src}`)))
          this.image.src = uri
        })
      }
    
      render() {
        Context.save()
        
        if (this.parallax) {
          const matrix = getMatrix()
          matrix.e /= this.parallax
          matrix.f /= this.parallax
          setMatrix(matrix)
        }

        if (this.repeat) {
          Context.save()
          Context.resetTransform()
          Context.beginPath()
          Context.rect(0, 0, Context.canvas.width, Context.canvas.height)
          Context.restore()
          Context.fillStyle = Context.createPattern(this.image, 'repeat')
          Context.fill()
        }

        else Context.drawImage(this.image, 0 , 0)

        Context.restore()
      }
    }
  },
}