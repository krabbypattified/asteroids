import context from '../context/context.js'
import render from '../render/render.js'

/**
 * This module defines a matrix that can render objects relative to it.
 */

export default {
  name: 'matrix',
  require: [context, render],
  define: ['Matrix'],
  initialize(library) {
    const { Context, Render } = library

    const Matrix = DOMMatrix || WebKitCSSMatrix

    // TODO modifying global
    Matrix.prototype.render = function render(...objects) {
      const { a, b, c, d, e, f } = this
      Context.save()
      Context.transform(a, b, c, d, e, f)
      objects.map(Render.render)
      Context.restore()
      return this
    }

    library.Matrix = Matrix
  },
}