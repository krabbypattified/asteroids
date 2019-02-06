import Library from 'asteroids'
import core from 'asteroids/core'

const lib = new Library({
  el: 'canvas',  // modules can utilize config
  getContext: { antialias: true },
  modules: [core],
})

const { Component } = lib

export { Component }
