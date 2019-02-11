/**
 * This module manages objects to render in the game.
 */

class Objects {
    constructor() {
      this.objects = new Set()
    }

    add(entity) {
      this.objects.add(entity)
    }

    delete(entity) {
      this.objects.delete(entity)
    }
  }
  
  export default {
    name: 'objects',
    define: ['Objects'],
    initialize(library) {
      library.Objects = new Objects()
    }
  }