## Module

_Every functionality in asteroids is separated into a module. This is what a module looks like._

```js
import core from 'asteroids/core'

export default {
  name: 'animations', // name for this module
  require: [core], // dependencies on other modules
  
  /**
   * Hook into a new game, i.e. new Game(configuration)
   */
  initialize(configuration) {
    return { ...configuration, animationSetting }
  }
  
  /**
   * Hook to define new classes in the library by returning them
   * Define is separate from extend because it performs a check
   * to ensure that a class is only ever defined in ONE module.
   */
  define(library) {
    return { NewClass }
  },
  
  /**
   * Hook to extend existing classes in the library  by returning them
   */
  extend(library) {
    const proto = library.Component.prototype
    const { created } = proto
    
    proto.created = function() {
      Object.assign(this, this.animations)
      created()
    }
    
    return { Component: library.Component }
  },  
}
```
