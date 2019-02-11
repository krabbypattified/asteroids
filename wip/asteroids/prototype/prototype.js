/**
 * Note from Kiki: Call this Turbo :)
 * 
 * This module defines the Prototype. This is the basic extendable class 
 * added to components of a game. Modules can hook into the Prototype
 * to add new native functionality or syntactic sugar to components.
 * 
 * class MyComponent extends Prototype {}
 * Prototype.from(overloadable)
 */

class Prototype {
  static from() {
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
      // it's a set of state objects (AssetComponent)
    }
  }
}

Prototype

export default {
  name: 'prototype',
  define: ['Prototype'],
  initialize(library) {
    library.Prototype = Prototype
  },
}

// Exactly match every state value to find a unique version.
// The state object must be first in the array.
// renderImage module runs code to render an Image.

/**
 * Fragment.find = (versions, state) => {
  return versions.find(version => {
    for (const key in state) if (state[key] !== version[key]) return false
    return true
  })
}

function Fragment(fragment) {
  const versions = []

  for (const assets of fragment) {
    const version = {}

    for (const asset of assets) {
      const type = asset.constructor
      if (!version[type]) version[type] = [asset]
      else version[type].push(asset)
    }

    version.Object = Object.assign(...version.Object)
    versions.push(version)
  }

  return class {
    constructor() {
      this.versions = versions
      this.state = {}
    }

    render() {
      Context.drawImage(blah, 0, 0)
    }
  }

  return {
    render() {

    }
  }
}
 */