import Game from './asteroids/asteroids.js'
import core from './asteroids/core/core.js'

export const { Context, Time, Space } = new Game({
  modules: [core],
  el: 'canvas',
})