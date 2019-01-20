import Game from 'asteroids'
import core from 'asteroids/core'

const game = new Game({
  el: 'canvas',
  getContext: { antialias: true },
  density: .1, // modules can utilize config
  modules: [core],
})

const { Component } = game

export { Component }
