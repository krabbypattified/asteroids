import { Context, Matrix, Time } from './game.js'
import { Ship } from './components/ship.js'

const ship = new Ship()

Context.imageSmoothingEnabled = false

Time.step(_ => {
  new Matrix()
    .scale(4)
    .render(ship)
})