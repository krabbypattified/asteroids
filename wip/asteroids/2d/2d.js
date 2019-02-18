import context from '../context/context.js'
import objects from '../objects/objects.js'
import pixels from '../pixels/pixels.js'
import protoAsset from '../proto-asset/proto-asset.js'
import protoMatrix from '../proto-matrix/proto-matrix.js'
import prototype from '../prototype/prototype.js'
import render from '../render/render.js'
import time from '../time/time.js'

/**
 * This module gathers all core and common 2d modules into one module.
 */

export default {
  name: '2d',
  require: [context, objects, pixels, protoAsset, protoMatrix, prototype, render, time],
}