import { Input, Canvas, Camera, Spacetime } from './game'
import { Stars, Ship } from './components'

// Entities
const stars = new Stars({ twinkle: 1 })
const ship = new Ship({ health: 3, booster: 3 })
const projectiles = []

// Controls
const { KeyF, MouseLeft, WASD } = Input
const mouse = Input.MouseRelative(_ => ship.position)

// Fullscreen keybind
KeyF.down(_ => (Canvas.fullscreen = !Canvas.fullscreen))

// Begin infinite twinkle animation
stars.twinkle()

// Game loop
Spacetime.draw = _ => {
    Camera.lerpAt(ship.position, .05)

    ship.steerTo(mouse.position)

    if (WASD.active) ship.accelerate(WASD.position)
    else ship.decelerate()

    if (MouseLeft.active) projectiles.concat(ship.fire())

    return [stars, ship, ...projectiles] // Render these entities
}
