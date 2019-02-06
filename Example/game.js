import Library from 'asteroids'
import core from 'asteroids/core'

const game = new Game({
  el: 'canvas',  // modules can utilize config
  getContext: { antialias: true, imageSmoothingEnabled: false },
  scale: 4,
  modules: [core],
})

const { Component } = game

export { Component }
