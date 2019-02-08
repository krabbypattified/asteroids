import Game from './asteroids/asteroids.js'
import core from './asteroids/core/core.js'

export const { Canvas, Component, Spacetime } = new Game({
  modules: [core],
  el: 'canvas',
  scale: 4,
})