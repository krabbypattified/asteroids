export default {
  name: 'canvas',
  defineConfiguration: ['el'],
  define: ['Canvas'],
  initialize(library, { el }) {
    library.Canvas = document.querySelector(el)
  },
}