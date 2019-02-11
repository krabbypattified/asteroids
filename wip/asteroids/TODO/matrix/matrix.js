/**
 * This module defines a universal Matrix API.
 */
  
export default {
  name: 'matrix',
  define: ['Matrix'],
  initialize(library) {
    library.Matrix = DOMMatrix || WebKitCSSMatrix
  }
}