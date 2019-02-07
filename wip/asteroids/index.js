class Game {
  constructor(configuration) {
    const modules = resolveModules(configuration.modules)
    const settings = {}
    const definitions = {}

    for (const module_ of modules) {
      for (const setting of module_.configure) {
        const dModule = settings[setting]
        if (dModule) throw new Error(`The ${setting} setting is already defined in the ${dModule.name} module.`)
        else settings[setting] = module_
      }

      for (const definition of module_.define) {
        const dModules = definitions[definition]
        if (dModules) throw new Error(`${definition} is already defined in the ${dModules[0].name} module.`)
        else definitions[definition] = [module_]
      }

      for (const extension of module_.extend) {
        const dModules = definitions[extension]
        if (!dModules) throw new Error(`Tried to extend ${extension} but it is undefined.`)
        else dModules.push(module_)
      }
    }

    modules.forEach(module_ => module_.initialize())
  }
}

function resolveModules(modules, path = []) {
  const resolved = new Set()

  const circular = path.length > new Set(path).size
  if (circular) throw new Error(`Circular dependency: ${path.join(' - ')}`)

  modules.forEach(module_ => {
    if (module_.require) resolved = new Set([...resolved, resolveModules(module.require, [...path,...module_])])
    resolve.add(module_)
  })

  return resolved
}

export default Game