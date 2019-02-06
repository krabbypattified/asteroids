import { World, Input, Component } from './lib'
import { Stars, Ship } from './components'

// Create a new (full-page) canvas
const world = new World({ noSmooth: true, scale: 4 })

// Entities
const stars = new Stars({ twinkle: 1 })
const ship = new Ship({ health: 3, booster: 3 })
const projectiles = []

// Controls
const { KeyF, MouseLeft, WASD } = Input
const mouse = Input.MouseRelative(ship) // Mouse in world relative to ship position

// Fullscreen keybind
KeyF.down(_ => (world.fullscreen = !world.fullscreen))

// Begin infinite twinkle animation
stars.twinkle()

// Game loop
world.draw = _ => {
    world.lerpAt(ship.position, .05)

    ship.steerTo(mouse.position)

    if (WASD.active) ship.accelerate(WASD.position)
    else ship.decelerate()

    if (MouseLeft.active) projectiles.concat(ship.fire())

    return [stars, ship, ...projectiles] // Render these entities
}
