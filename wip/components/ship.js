import { Component } from '../game.js'

export class Ship extends Component {
  constructor() {
    this.capsule = new Capsule()
    this.health = 2
  }

  render() {    
    this.spacetime
      .transform(a,b,c,d,e,f)
      .render(blade)
    
    this.spacetime
      .translateX(-10)
      .render(handle)
  }
}

// Sword.public = { damage: Number }