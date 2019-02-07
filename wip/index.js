import Game from './asteroids'
import core from './asteroids/core'

const game = new Game({
  el: 'canvas',
  scale: 4,
  modules: [core],
})

const { Component } = game

export { Component }
