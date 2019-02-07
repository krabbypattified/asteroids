## Animation

_State interpolation for components._

```js
class MyComponent extends Component {
  async doSomething() { 
    await this.doSomething.interpolate({
      next: _ => ({ someVal: this.someVal - 2 }), // state for next frame
      duration: 60, // frames
      condition: _ => this.someVal > 0, // short-circuit
    })

    while(this.someVal < 100) {
      await this.animate({ next: { someVal: this.someVal + 1 }, duration: 10 })
      await this.animate({ next: { someVal: this.someVal - 1 }, duration: 5 })
    }
  }
}

MyComponent.animations = ['doSomething']

const myComponent = new MyComponent()

myComponent.doSomething.play() // resume
myComponent.doSomething.playLoop() // resume, loop when finished
myComponent.doSomething.pause() // pause
myComponent.doSomething.stop() // restart
```
