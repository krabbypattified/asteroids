## Spacetime

_Defines a coordinate system, game loop, and temporal* object manager._

_* it can keep track of previous states with a `bufferSpacetime` setting so other modules like Collision can interpolate through time._

```js
{
  bufferSpacetime: 1,
  fps: 60,
}
```

```js
const Spacetime = new WeakSet()
const x = new MyComponent()
Spacetime.add(x)
Spacetime.delete(x)
```
