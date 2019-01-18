## Animation

_State interpolation for components._

```js
class MyThing extends Component {
  animations = {
    doSomething: async _ => {
      await this.animate({
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
}

const myThing = new MyThing()

myThing.doSomething.play() // resume
myThing.doSomething.playLoop() // resume, loop when finished
myThing.doSomething.pause() // pause
myThing.doSomething.stop() // restart
```
