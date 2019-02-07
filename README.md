# Work-in-progress
Asteroids is currently a work-in-progress. The implementation will be released in this repository
once it is ready for production. Draft specifications may be found in this repository.

# Asteroids
_A lightweight 2D game engine._

The problem I notice with most game engines is they try to do too much at once. This is a
problem with software in general. Take Photoshop for example. There is a menu item to accomplish
any task, but this creates a heavyweight program with a steep learning curve. There is a
principle in the SOLID design principles called the Interface segregation principle. It states
that no client should be forced to depend on methods it does not use. Keeping the Photoshop
analogy, Sketch was invented to replace the core functionality of Photoshop with around 5% of the
size and a much faster learning curve. The motivation for this project is the same
as software like Node.js, Koa, React, and Sketch: to create a simple, focused API for
modularizing the components of a larger problem, in this case: video games. Much like Sketch is
a simple program with core functionality and extendable plugins, the `asteroids` NPM module is
a blank canvas with its own module system where developers may define and extend values in
the library. The _Asteroids Core_ itself is simply a collection of modules. This means _Asteroids_ is
100% what you love in a game engine and 0% what you hate in a game engine. 

<!-- TODO Working Gif -->

## Module system

The core functionality of _Asteroids_ are found in a collection of modules.

See [Module.md](https://github.com/krabbypattified/asteroids/blob/master/Module.md)

## Component (Module)

A component is a blueprint for an object in the game. They are composed and instantiated into a virtual DOM.

See [Component.md](https://github.com/krabbypattified/asteroids/blob/master/Component.md)

## Animation (Module)

State interpolation for components.

See [Animation.md](https://github.com/krabbypattified/asteroids/blob/master/Animation.md)

## Collision (Module)

O(n) AABB collision for n objects. (broad-phase)
Polygonal collision with GJK (narrow-phase)

See [Collision.md](https://github.com/krabbypattified/asteroids/blob/master/Collision.md)

## Assets

A programming pattern for managing assets.

See [Assets.md](https://github.com/krabbypattified/asteroids/blob/master/Assets.md)

## Example

How to make a game.

See [Example](https://github.com/krabbypattified/asteroids/tree/master/Example)

## More to come

- Shaders
- 3D
- UI Plugin
