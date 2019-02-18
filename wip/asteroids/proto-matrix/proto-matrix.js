import matrix from '../matrix/matrix.js'
import prototype from '../prototype/prototype.js'

/**
 * This module gives components the power to compose render trees via matrix.
 */

export default {
  name: 'proto-matrix',
  require: [matrix, prototype],
  extend: ['Prototype'],
  initialize(library) {
    const { Matrix, Prototype } = library

    library.Prototype = class ProtoMatrix extends Prototype {
      constructor() {
        super(...arguments)
        this.matrix = new Matrix()
      }
    }
  },
}