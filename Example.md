```js
import { World, Controls } from 'asteroids'
import { Stars, Ship } from './components'

// Create a new (full-page) canvas
const world = new World({ noSmooth: true, scale: 4 })

// Entities
const stars = new Stars({ twinkle: 1 })
const ship = new Ship({ health: 3, booster: 3 })
const projectiles = []

// Controls
const KeyF = new Controls.key('KeyF')
const MouseLeft = new Controls.key('MouseLeft')
const arrowKeys = new Controls.WASD()
const mouse = new Controls.Mouse(world, ship) // Mouse in world relative to ship position

// Fullscreen keybind
KeyF.down(_ => (world.fullscreen = !world.fullscreen))

// Begin infinite twinkle animation
stars.twinkle()

// Game loop
world.draw = _ => {
    world.lerpAt(ship.position, .05)

    ship.steerTo(mouse.position)

    if (arrowKeys.active) ship.accelerate(arrowKeys.position)
    else ship.decelerate()

    if (MouseLeft.active) projectiles.concat(ship.fire())

    return [stars, ship, ...projectiles] // Render these entities
}
```
