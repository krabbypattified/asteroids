import { Input, Canvas, Camera, Spacetime } from './game'
import { Stars, Ship } from './components'

// Entities
const stars = new Stars({ twinkle: 1 })
const ship = new Ship({ health: 3, booster: 3 })

// Add entities to game
Spacetime.add(stars, ship)

// Controls
const { KeyF, MouseLeft, WASD } = Input
const mouse = Input.Mouse(_ => ship.position)

// Fullscreen keybind
KeyF.down(_ => (Canvas.fullscreen = !Canvas.fullscreen))

// Begin infinite twinkle animation
stars.twinkle.play()

// Game loop
Spacetime.loop = _ => {
    Camera.lerpAt(ship.position, .05)

    ship.steerTo(mouse.position)

    if (WASD.active) ship.accelerate(WASD.position)
    else ship.decelerate()

    if (MouseLeft.active) ship.fire() // projectiles add/remove themselves to spacetime
}
