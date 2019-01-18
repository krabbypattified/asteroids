[core]: https://gist.github.com/krabbypattified/414ee3ee8150be619a56771c16d5f50b
[collision]: https://gist.github.com/krabbypattified/0f121ac9066fb7f1f42971275b0ce658

# Work-in-progress
Asteroids is currently a work-in-progress. The code will be released in
this repository once it is ready for production. Here are specifications I am actively working on:

[Asteroids Core][core]

[Broad-phase Collision Detection O(n)][collision]

# Asteroids
_A lightweight 2D game engine._

The problem I notice with most game engines is they try to do too much at once. This is a
problem with software in general. Take Photoshop for example. There is a menu item to accomplish
any task, but this creates a heavyweight program with a steep learning curve. There is a
principle in the SOLID design principles called the Interface segregation principle. It states
that no client should be forced to depend on methods it does not use. Keeping the Photoshop
analogy, Sketch was invented to replace the core functionality of Photoshop with around 5% of the
size and at least a 10x faster learning curve. The motivation for this project is the same
as software like Node.js, Koa, React, and Sketch: to create a simple, focused API for
modularizing the components of a larger problem, in this case: video games. Much like Sketch is
a simple program with core functionality and extendable plugins, the `asteroids` NPM module is
a blank canvas with its own module system where developers may define and extend values in
the library. The _Asteroids Core_ itself is a collection of modules. This means _Asteroids_ is
100% what you love in a game engine and 0% what you hate in a game engine. 

<!-- TODO Working Gif -->

###  _TODO_ Update everything below to match the specification.

## Module system

See [Asteroids Core][core] Module.js

## Composing the game

This is an example of a game created with _Asteroids_. Without even understanding the game engine,
it is possible to understand what is happening due to the same declarative mechanisms that make React
apps easy to understand. Everything is abstracted just enough, but not too much.

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



<!-- TODO revise everything below, outdated-->



## Components

A component is a blueprint for an entity. In JavaScript, it is actually a `Class` that can instantiate
entities. One may define a component by creating a pure function that takes state and returns entities.
A `new Hand` entity for example might accept a state of `{ fingers: 5 }` and return 5 `new Finger`s.
__One__ way to define a component is with an array of objects that contain image data (is optional, can
be a promise) and a corresponding state (whose properties must be numeric):

```js
const Finger = Component([
  { healthy: 0 }, // no finger :(
  { healthy: 1, image: import('./finger.png') }, // using an image loader
])
```

The above is called a __low-level component__ because this type of component is fully responsible
for rendering images and hitboxes into the game.

Alternatively, one may create a component that is responsible for rendering other components.
This is called a __high-level component__ and is created by calling `Component` with a function
that returns an array of `Entity`s.

```js
const Hand = Component(({ healthy }) => [
    new Finger({ healthy }),
    new Finger({ healthy }).translate(10, 0),
    new Finger({ healthy }).translate(20, 0),
    new Palm({ healthy }).translate(10, 10),
])

// or this pattern if one does not prefer to instantiate (lightweight) entities every frame.
const finger = new Finger({ healthy: 1 })
const Hand = Component(({ healthy }) => [
    finger.setState({ healthy }),
    // ...
])
```

## The World

Before we talk more about entities, it may be a good time to explain the world. `new World`
creates a <canvas> element. Think of this canvas as a viewport into a 2D world. The world
is initialized by putting the center of the universe (0, 0) in the middle of the viewport.
A world is responsible for running a game loop (the `draw` function) that renders all of
the entities returned from that function (as an array). The world object allows the user
to read and modify the current state of the viewport (where it is looking at for example).

## Entities

Entities are lightweight, stateful objects whose blueprint is a component. The state is
initialized upon instantiation via `new MyComponent({...state})`. Entity contruction for low-level
components is one reason why all state must be numeric. The JavaScript `find` function
is used to round the state values in the constructor to the nearest integer and find the first
low-level entity that matches all of the values specified. The state also consists of a
transformation matrix (`entity.matrix`), position, velocity, acceleration, and a shader. Think of
entities in relation to the game loop, where there is an entity hierarchy starting at the array
returned from the `draw` function. The position and transformation matrix are applied to the canvas.
Then the current state of the entity is applied to the render function in order to produce more
entities to be spawned there. The source code may explain itself better than I can:

```js
class Entity {
    // ...
    draw(world) {
        // ...
        canvas.push()
        canvas.translate(x, y)
        canvas.applyMatrix(a, b, c, d, tx, ty)

        entities.forEach(entity => {
            if (entity.type === 'HighLevelComponent') entity.draw(world)
            // ...
        })

        canvas.pop()
    }
}
```

## Functions

Functions are used to abstract complex behavior of entities.

```js
const Hand = Component(...)

Hand.function('grab', function(item) {
  this.animateFingers()
  this.position = item.position
})

const hand = new Hand(...)
const carrot = new Carrot(...)

hand.grab(carrot)
```

Here is a more complex example used to rotate an entity about an anchor point:

```js
Hand.function('rotate', function(vector) {
  // Rotate Ship about (-17/2, -11) via matrix transformation (rotate + translate). This effectively creates an anchor point.
  const rotation = Math.atan2(vector.y, vector.x) * 180/3.14159 + 90
  this.matrix = this.matrix.reset()
  this.matrix = this.matrix.rotate(rotation)
  this.matrix = this.matrix.translate(-17/2, -11)
})
```

## Animation

Animations are special functions that have the ability to interpolate the state of an entity
in sync with the game loop. Here is the most basic example:

```js
const Hand = Component(...)

Hand.animation('sufferAndDie', async anim => {
  await anim({ prop: 'health', to: 0, speed: 2 })
})

new Hand(...).sufferAndDie()
```

Animations can be complex. This API aims to simplify the process. The `prop` is the state
value to be modified each frame. The `to` is the target value after which the promise
will fulfill. The `speed` is the integers per frame that the `prop` will by modified by.
Setting a component's `animationSpeed` will globally modify `speed` so it may be easier
to read.

Animation is another reason why state values must be numeric. It allows the rendering process
to find the closest renderable value to the current state of the object.

Here is another example to illustrate the capabilities of the animation API:

```js
const Hand = Component(...)

Hand.animationSpeed = .02

Hand.animation('tortureForever', async (anim, arg) => {
  await anim({ prop: 'health', to: 10, speed: 3 })
  while(true) {
    await anim({ prop: 'health', to: 5, speed: 3 })
    await anim({ prop: 'health', to: arg, speed: 1 })
    await world.wait(1000)
  }
})

new Hand(...).tortureForever(1)
```

## More to come

- Collision
- Shaders
- Plugins
- 3D
- UI Framework (JSX?)

My next goal for this game framework is to create a plugin environment that allows full
extendability to any of the current primitive systems. For instance, this should allow
someone to add a shaders feature to their game via plugins (or to create their own).

The core of the code itself will be refactored such that animation, for example, becomes
a plugin. This will make the core of the framework only a few kilobytes and leave
implementations such as broad-phase and narrow-phase collision detection up to the user.

Opinionated extensions to this framework will be supported via peer dependencies.
