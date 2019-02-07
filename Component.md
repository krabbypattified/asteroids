## Component

_Like a React/HTML component but for entities._

```js
class Sword extends Component {
  blade = new Blade()
  handle = new Handle()
  damage = 1
  get shine () { return this.damage / 30 }

  create() {
    this.glimmer.play()
  }
  
  render() {    
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

Sword.public = { damage: Number }
Sword.animations = ['glimmer']
Sword.collision = true
```

## Asset Component

_A low-level Component_

```js
const Blade = Asset([
  [ {length: 1}, assets.sword.short ],
  [ {length: 2}, assets.sword.long ],
])

Asset([...states])
states = [state, ...pixels, ...polygons]
state = { foo: 7 }
pixels = 'fileData'
polygon = [[x,y], ...]
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
