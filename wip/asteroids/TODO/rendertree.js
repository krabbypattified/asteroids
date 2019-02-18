Context.save()
Context.transform()

Context.drawImage(dog)

Context.save()
Context.transform()
Context.drawImage(cat)
Context.restore()

Context.restore()


const x = Context.transform(2)

x
  .render(dog, elephant)
  .render(CatComponent)
