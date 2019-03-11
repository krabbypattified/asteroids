import { Context, Matrix, Time, Pixels } from './asteroids.js'
import { Ship } from './components/ship.js'

let camera = new Matrix().scale(.25).translate(-Context.canvas.width/2, -Context.canvas.height/2)
const ship = new Ship()

Context.imageSmoothingEnabled = false


Time.step(_ => {
  Context.fillRect(0, 0, Context.canvas.width, Context.canvas.height)
  camera = camera.translate(1, 1)
  camera
    .inverse()
    .render(ship)
})