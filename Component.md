## Component

_Like React/HTML components but for game entities._

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
