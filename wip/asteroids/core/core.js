import context from '../context/context.js'
import time from '../time/time.js'
import objects from '../objects/objects.js'
import space from '../space/space.js'

/**
 * This module gathers all core modules into one module.
 */

export default {
  name: 'core',
  require: [context, time, objects, space],
}