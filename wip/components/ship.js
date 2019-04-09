import { Prototype, Pixels } from '../asteroids.js'

export class Ship extends Prototype {
  constructor() {
    super(...arguments)
    this.ship = new Pixels('../assets/Dummy/box.png')
  }

  render() {
    this.matrix
      .render(this.ship)
  }
}