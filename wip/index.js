import { Context, Time, Space } from '/game.js'
import { imagesLoaded, images } from '/images.js'

// import { Ship } from './components/ship.js'
// const ship = new Ship({ health: 2 })
// Objects.add(ship)

Context.imageSmoothingEnabled = false

Space.transform(new DOMMatrix().scale(.5))

;(async function() {
  await imagesLoaded

  Time.step(_ => {
    Context.drawImage(images.cat, 0, 0)
  })
})()