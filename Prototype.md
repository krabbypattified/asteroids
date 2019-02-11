## Prototype

_Cool functionality for all of your game components._

```js
class Sword extends Prototype {
  blade = new Blade()
  handle = new Handle()
  damage = 1
  get shine () { return this.damage / 30 }

  create() { // component module
    this.glimmer.play()
  }
  
  render() { // render module
    this.spacetime
      .transform(a,b,c,d,e,f)
      .render(blade)
    
    this.spacetime
      .translateX(-10)
      .render(handle)
  }
  
  sharpen(value) { this.sharpness += value }
  
  async glimmer(animate) {
    await animate({
      next: _ => ({ sharpness: this.sharpness + .2 }),
      duration: 60,
      condition: _ => this.sharpness > 5
    })
  }
}

Sword.public = { damage: Number } // TBD
Sword.animations = ['glimmer'] // animate module
Sword.collision = true // collision module
```

## Prototype.from

_A helper to generate a Prototype component without having to explicitly extend Prototype._

Here is an example of how low-level components look:

```js
const Blade = assets.sword.short
const Blade = [assets.sword.short]
const Blade = Prototype.from([ // component module
  [ {length: 1}, assets.sword.short ], // renderImage module
  [ {length: 2}, assets.sword.long ],
])
```

## Managing Assets

```js
const assets = {
 sword: {
   short: import('./Sword/short.png'),
   long: 'anythingSyncOrAsync',
 }
}
```
