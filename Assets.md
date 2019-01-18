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
const Blade = new Renderable([
  [ {length: 1}, assets.sword.short ],
  [ {length: 2}, assets.sword.long ],
])
```
