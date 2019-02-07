## Spacetime

_Defines a way to manage objects in space through time._

A
```js
const objects = new WeakSet()
const x = new MyComponent() // implicitly add to objects (link Component and Spacetime)
```

B
```js
const objects = new WeakSet()
const x = new MyComponent()
Spacetime.render = {
  return [x] // adds x to objects each frame
}
```

C
```js
const objects = new WeakSet()
const x = new MyComponent()
Spacetime.add(x) // explicitly adds x to objects
```
