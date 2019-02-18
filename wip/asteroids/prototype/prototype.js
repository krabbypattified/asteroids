/** 
 * This module defines the Prototype. This is the basic extendable class 
 * added to components of a game. Modules can hook into the Prototype
 * to add new native functionality or syntactic sugar to components.
 * @example class MyComponent extends Prototype {}
 */

export default {
  name: 'prototype',
  define: ['Prototype'],
  initialize(library) {
    library.Prototype = class Prototype { }
  },
}