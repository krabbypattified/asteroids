import { Canvas, Spacetime } from './game.js'
import { Ship } from './components/ship.js'

console.log(Canvas)

const ship = new Ship({ health: 2 })

Spacetime.add(ship)