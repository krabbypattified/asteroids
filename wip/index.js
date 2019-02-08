import Game from './asteroids/index.js'
import core from './asteroids/core/core.js'

const game = new Game({
  el: 'canvas',
  // scale: 4,
  modules: [core],
})

const { Component } = game

export { Component }
