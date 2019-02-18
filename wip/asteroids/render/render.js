import context from '../context/context.js'

/**
 * The render module delegates rendering components to another the modules
 * that define the components. It renders renderable objects every frame.
 */

export default {
  name: 'render',
  define: ['Render'],
  initialize(library) {
    library.Render = class Render {
      static render(object) {
        if (object.render) object.render()
      }
    }
  },
}