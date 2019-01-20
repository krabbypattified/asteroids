# Work-in-progress
Asteroids is currently a work-in-progress. The implementation will be released in this repository
once it is ready for production. The draft specifications that may be found in this repository.

# Asteroids
_A lightweight 2D game engine._

The problem I notice with most game engines is they try to do too much at once. This is a
problem with software in general. Take Photoshop for example. There is a menu item to accomplish
any task, but this creates a heavyweight program with a steep learning curve. There is a
principle in the SOLID design principles called the Interface segregation principle. It states
that no client should be forced to depend on methods it does not use. Keeping the Photoshop
analogy, Sketch was invented to replace the core functionality of Photoshop with around 5% of the
size and at least a 10x faster learning curve. The motivation for this project is the same
as software like Node.js, Koa, React, and Sketch: to create a simple, focused API for
modularizing the components of a larger problem, in this case: video games. Much like Sketch is
a simple program with core functionality and extendable plugins, the `asteroids` NPM module is
a blank canvas with its own module system where developers may define and extend values in
the library. The _Asteroids Core_ itself is a collection of modules. This means _Asteroids_ is
100% what you love in a game engine and 0% what you hate in a game engine. 

<!-- TODO Working Gif -->

## Module system

See [Module.md](https://github.com/krabbypattified/asteroids/blob/master/Module.md)

## Composing the game

See [Example](https://github.com/krabbypattified/asteroids/tree/master/Example)

## Components

A component is a blueprint for an object in the game. They are composed into a component tree.

See [Component.md](https://github.com/krabbypattified/asteroids/blob/master/Component.md)

## Animation

See [Animation.md](https://github.com/krabbypattified/asteroids/blob/master/Animation.md)

# Collision

See [BroadCollision.md](https://github.com/krabbypattified/asteroids/blob/master/BroadCollision.md)

## More to come

- Shaders
- 3D
- UI Plugin

My next goal for this game framework is to create a plugin environment that allows full
extendability to any of the current primitive systems. For instance, this should allow
someone to add a shaders feature to their game via plugins (or to create their own).

The core of the code itself will be refactored such that animation, for example, becomes
a plugin. This will make the core of the framework only a few kilobytes and leave
implementations such as broad-phase and narrow-phase collision detection up to the user.

Opinionated extensions to this framework will be supported via peer dependencies.
