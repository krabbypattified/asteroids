import Game from './asteroids/asteroids.js'
import base from './asteroids/2d/2d.js'

export const { Context, Matrix, Objects, Pixels, Prototype, Time } = new Game({
  modules: [base],
  el: 'canvas',
})