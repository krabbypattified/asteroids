import { Pixels, Prototype } from '../asteroids.js'

const LeftBooster = Prototype.asset([
  [{ health: 0 }, new Pixels('./assets/Ship/LeftBooster/health0.png')],
  [{ health: 1 }, new Pixels('./assets/Ship/LeftBooster/health1.png')],
  [{ health: 2 }, new Pixels('./assets/Ship/LeftBooster/health2.png')],
  [{ health: 3 }, new Pixels('./assets/Ship/LeftBooster/health3.png')],
  [{ health: 3, lit: 1 }, new Pixels('./assets/Ship/LeftBooster/lit.png')],
].map(([state, pixels]) => {
  pixels.parallax = 4
  return [{ lit: 0, ...state }, pixels]
}))

const LeftFlame = Prototype.asset([
  [{ booster: 0 }],
  [{ booster: 1 }, new Pixels('./assets/Ship/LeftFlame/1.png')],
  [{ booster: 2 }, new Pixels('./assets/Ship/LeftFlame/2.png')],
  [{ booster: 3 }, new Pixels('./assets/Ship/LeftFlame/3.png')],
  [{ booster: 4 }, new Pixels('./assets/Ship/LeftFlame/4.png')],
  [{ booster: 5 }, new Pixels('./assets/Ship/LeftFlame/5.png')],
])

const MiddleBooster = Prototype.asset([
  [{ lit: 0 }, new Pixels('./assets/Ship/MiddleBooster/0.png')],
  [{ lit: 1 }, new Pixels('./assets/Ship/MiddleBooster/1.png')],
])

const Stars = Prototype.asset([
  [{ twinkle: 0 }, new Pixels('./assets/Ship/Stars/0.png')],
  [{ twinkle: 1 }, new Pixels('./assets/Ship/Stars/1.png')],
])

// const MiddleFlame = Prototype.asset([
//   { image: null, booster: 0 },
//   { image: middleflame1, booster: 1 },
//   { image: middleflame2, booster: 2 },
//   { image: middleflame3, booster: 3 },
//   { image: middleflame4, booster: 4 },
//   { image: middleflame5, booster: 5 },
// ])

// const RightBooster = Prototype.asset([
//   { image: rightbooster0, lit: 0 },
//   { image: rightbooster1, lit: 1 },
// ])

// const RightFlame = Prototype.asset([
//   { image: null, booster: 0 },
//   { image: rightflame1, booster: 1 },
//   { image: rightflame2, booster: 2 },
//   { image: rightflame3, booster: 3 },
//   { image: rightflame4, booster: 4 },
//   { image: rightflame5, booster: 5 },
// ])

export class Ship extends Prototype {
  constructor() {
    super(...arguments)
    this.stars = new Stars({ twinkle: 0 })
  }

  render() {
    this.matrix
      .render(this.stars)
  }
}