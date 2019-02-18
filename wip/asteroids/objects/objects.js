/**
 * This module manages objects to render in the game.
 */

export default {
  name: 'objects',
  define: ['Objects'],
  initialize(library) {
    library.Objects = new Set()
  }
}