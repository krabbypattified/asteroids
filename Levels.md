## Levels

_A pattern for loading levels._

Allows you to define (upon loading a level) how to:
- destroy objects
- create objects
- set object states

```js
let ship = new Ship()
let projectiles = []
let enemies = []

const levels = {
  10: function() {
    ship.position = [10,20]
    enemies.push(new Enemy())
  }
}

function loadLevel(level) {
  Spacetime.delete(ship)
  ship.position = [0,0]
  projectiles = []
  enemies = []

  setTimeout(_ => {
    levels[level]()
    Spacetime.add(ship)
  }, 1000)
}
```
