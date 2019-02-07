## Broad-phase Collision

_An algorithm for AABB collision detection in O(n) time complexity._

## Configuration
```js
{
  /**
   * A list of entities to keep track of, may be changed every frame.
   */
  entities: [one, two],
  
  /**
   * An optimization parameter that should indicate the fraction of space occupied by collision boxes.
   * Should be higher if many objects move very quickly between frames.
   */
  density: .1,
  
  /**
   * Get the [[x, y], ...] values that define the entity's hitbox.
   * Less points is better because an AABB is computed every frame.
   */
  getPoints: entity => entity.points
  
  /**
   * Function to handle a detected collision.
   */
  handleCollision: (one, two) => {
    one.broadCollisions.add(two)
    two.broadCollisions.add(one)
  },
}
```

## Components

Collision must be mutually exclusive (no two entities share the same instance of a colliding entity)

```js
MyComponent.collision = true
```

## Algorithm

This describes a 2D broad-phase collision detection algorithm that runs in O(n) time where n is the number of entities. It easily extends to 3D. It holds no state except entity bounding box calculated during the previous frame in order to prevent phasing. The algorithm performs 4 steps every frame: Rectangle Creation, Rectangle Sorting, Chunk Creation, and Collision Detection.

### Definitions
- point = a point in 2D space
- path = an open set of linearly connected points
- polygon = a closed set of linearly connected points
- entity = a point or path or polygon
- space = the 2D space formed by two spatial dimensions
- spacetime = the 3D space formed by two spatial dimensions and a time dimension
- hyperentity = the linear interpolation of an entity in spacetime between 2 frames (a prism) projected back into space
- rect = the bounding box of an entity
- hyperrect = the bounding box of a hyperentity

### Rectangle Creation
- objective : for each entity, compute its hyperrect
- time complexity : O(np) n = entities, p = average number of points per entity

```
for each entity
  boundingBox = the min/max X/Y values in the hyperentity's set of points
  if boundingBox > minChunkSize
    divide the box along the longest dimension until < minChunkSize
```

### Rectangle Sorting
- objective : radix sort the hyperrects along each dimension
- time complexity : O(n) n = entities

```
buckets = 2^5
range = 2^12
accuracy = 2^3
places = log2(range) + log2(accuracy)
iterations = ceil(places / log2(buckets))
iterationSize = places / iterations

LIST = get list of entity bounds for dimension A and format as a
       byte array according to range and accuracy (011.10 => 000000000011.100)

foreach iteration
  create buckets
  use the first X bits in LIST according to iterationSize to sort into buckets
  LIST = append the buckets
```

### Chunk Creation
- objective : recursively bisect the space in two dimensions so each chunk only needs to check collision for max N entities
- time complexity : O(n) n = entities

```
foreach dimension
  for entity, idx in LIST[x|y]
    entity.[xChunk|yChunk] = idx div maxEntitiesPerChunk

chunks = createchunks(LIST)

foreach entity in LIST
  chunks[entity.xChunk,entity.yChunk].push(entity)  
```

### Collision Detection
objective : to register collisions for each entity
time complexity : O(n) n = entities
```
foreach chunk
  done = []
  foreach point
    foreach LIST (X and y)
      this = rect(point)
      sliceX = get LIST indices between left and right bounds
      foreach that in sliceX
        if !this.collisions.that
          if that.Bottom < this.Top & that.Top > this.Bottom
            this.collisions += that; that.collisions += this
```
