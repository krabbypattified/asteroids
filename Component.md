## Component

_Like HTML components but for game entities._

```js
class Sword extends Component {
  blade = new Blade()
  handle = new Handle()
  damage = 1
  get shine () { return this.damage / 30 }

  props = { damage: Number }

  created() {
    this.glimmer.play()
  }

  destroyed() {
    this.glimmer.stop() // .pause()
  }
  
  render() {
    const { context, sharpness, shine } = this
    
    context
      .transform(a,b,c,d,e,f)
      .render(blade)
    
    context
      .translateX(-10)
      .render(handle)
  }

  sharpen(amt) { this.sharpness += amt }

  animations = {
    async glimmer() {
      await this.animate({
        next: _ => ({ sharpness: this.sharpness + .2 }),
        duration: 60,
        condition: _ => this.sharpness > 5
      })
    },
  }
}
```
