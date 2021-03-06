## Modules

_Every functionality in asteroids is separated into a module. This is how a module is defined._

```js
import core from 'asteroids/core'

export default {
  /**
   * Give this module a name
   */
  name: 'animations',
  
  /**
   * List dependencies on other modules
   */
  require: [core],
  
  /**
   * List configuration settings defined by this module
   */
  configure: ['animationSetting'],
  
  /**
   * List library components defined by this module
   */
  define: ['NewClass'],
   
  /**
   * List library components extended by this module
   */
  extend: ['OtherClass'],
  
  /**
   * Initialize your module during the Game creation hook.
   */
  initialize(library, configuration) {
    const { Component } = library
    const { prototype } = Component
    const { created } = prototype
    
    libary.NewClass = 'something'
    
    prototype.created = function() {
      Object.assign(this, this.animations)
      created()
    }
  }
}
```
