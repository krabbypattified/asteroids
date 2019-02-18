import prototype from '../prototype/prototype.js'
import render from '../render/render.js'

/**
 * This module is a helper for creating low-level components.
 */

export default {
  name: 'proto-asset',
  require: [prototype, render],
  extend: ['Prototype'],
  initialize(library) {

    const { Prototype, Render } = library

    library.Prototype = class ProtoAsset extends Prototype {
      /**
       * Creates a component from a state object and list of renderable assets
       * @param versions: [[stateObject, ...assets], ...states]
       */

      static asset(versions) {
        return class extends Prototype {
          constructor(state = {}) {
            super(...arguments)
            this.state = {}
            this.set(state)
          }

          // TODO memoize
          set(state) {
            Object.assign(this.state, state)
            this.version = versions.find(version => {
              for (const key in version[0]) if (state[key] !== version[0][key]) return false
              return true
            })
            return this
          }
  
          render() {
            this.version.slice(1).map(Render.render)
          }
        }
      }
    }
  },
}