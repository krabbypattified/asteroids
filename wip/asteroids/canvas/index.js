export default {
  name: 'canvas',
  defineConfiguration: ['el'],
  define: ['Canvas'],
  initialize({ el }) {
    console.log(document.querySelector(el))
  },
}