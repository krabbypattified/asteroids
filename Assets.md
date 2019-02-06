## Assets

_A programming pattern for managing assets._
 
 ```js
const assets = {
  sword: {
    short: import('./Sword/short.png'),
    long: 'anythingSyncOrAsync',
  }
}

// Example usage (a low-level component)
const Blade = Renderable([
  [ State({length: 1}), assets.sword.short ],
  [ State({length: 2}), assets.sword.long ],
])
```
