/**
 * This module gets the canvas on the screen.
 */

export default {
  name: 'canvas',
  configure: ['el'],
  define: ['Context'],
  initialize(library, { el }) {
    library.Context = document.querySelector(el).getContext('2d')
  },
}