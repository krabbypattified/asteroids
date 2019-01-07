const LeftBooster = Source([
  [ {lit: 0}, image('./LeftShip/0.png'), hitbox(0,0,10,20) ],
  [ {lit: 1}, image('./LeftShip/1.png'), hitbox(0,0,10,20) ],
])


const LeftFlame = Source([
  [ {level: 0}, image('./LeftFlame/0.png'), hitbox(0,0,10,10) ],
  [ {level: 1}, image('./LeftFlame/1.png'), hitbox(0,0,10,10) ],
])


class LeftShip extends Component {
  data = { engine: 0, health: 3 }
  computed = { lit: _ => this.engine > 2 ? 1 : 0 }
  
  render({ ctx }) {
    const { engine, health, lit } = this
    
    ctx
      .opacity(health / 3)
      .render(new LeftBooster({ lit }))
    
    ctx
      .translate(0, 8)
      .render(new LeftFlame({ level: engine }))
  }
}


class Ship extends Component {
  leftShip = new LeftShip()
  middleShip = new MiddleShip()
  rightShip = new RightShip()

  data = {
    engine: 1,
    health: 3,
    flying: false,
  }
  
  render({ ctx }) {
    const { engine, health } = this
    
    ctx
      .translate(0, 9)
      .render(this.leftShip.set({ engine, health }))
    
    ctx
      .translate(4, 0)
      .render(this.middleShip.set({ engine }))
    
    ctx
      .translate(13, 9)
      .render(this.rightShip.set({ engine }))
  }

  fly(...point) {
    const p = new Point(...point)
    
    if (this.flying === Boolean(p.magnitude)) return
    else this.flying = !this.flying
    
    if (this.flying) {
      this.boostersOff.stop()
      this.boostersOn.play()
    }
    
    else {
      this.boostersOn.stop()
      this.boostersOff.play()
    }
  }
  
  setEngine(next, duration = Infinity, condition = false) {
    return this.animate({
      next: _ => ({ engine: this.engine + next }),
      duration,
      condition: condition && _ => condition(this.engine),
    })
  }

  animations = {
    async boostersOn() {
      const dir = sign(3 - this.engine)
      await this.setEngine(.1 * dir, 30, dir > 0 ? v => v < 3 : v => v > 3)
      
      while(true) {
        await this.setEngine(.1, 20)
        await this.setEngine(-.1, 20)
      }
    }
  }
}
