/**
 * This is the entry point for Asteroids.
 * It is nothing more than a module resolver.
 * The modules themselves are responsible for implementing the library.
 */

export default class Game {
  constructor(configuration) {
    const validated = validateConfiguration(configuration)
    if (validated instanceof Error) return console.error(validated)

    const modules = right(configuration.modules).map(resolveModules).map(normalizeModules).map(validateModules).value
    if (modules instanceof Error) return console.error(modules)

    const initialized = right({ modules, configuration, library: this }).map(validateModuleConfiguration).map(initializeModules).value
    if (initialized instanceof Error) return console.error(initialized)
  }
}

function left(value) {
  return new class Left {
    constructor() { this.value = value }
    map() {
      return this
    }
  }
}

function right(value) {
  return new class Right {
    constructor() { this.value = value }
    map(function_) {
      const return_ = function_(this.value)
      if (return_ instanceof Error) return left(return_)
      else return right(return_)
    }
  }
}

function validateConfiguration(configuration) {
  if (!configuration || !Array.isArray(configuration.modules)) return new Error(`Invalid configuration object.`)
}

function resolveModules(modules) {
  const dependencies = new Map()
  resolveModule({ name: 'GAME', require: modules }, dependencies, [])
  return [...dependencies.values()]
}

function resolveModule(module, dmap, path) {
  if (!module) return new Error(`Found an undefined module.`)
  if (!module.name) return new Error(`Found a module with no name.`)

  if (path.indexOf(module.name) >= 0) return new Error(`Circular dependency: ${path.join(' - ')} - ${module.name}`)

  const dependency = dmap.get(module.name)
  if (dependency && dependency !== module) return new Error(`Found multiple instances of the ${dependency.name} module.`)
  dmap.set(module.name, module)

  const subModules = module.require || []

  for (const subModule of subModules) {
    const modules = resolveModule(subModule, dmap, [...path, module.name])
    if (modules instanceof Error) return modules
  }

  return dmap
}

function normalizeModules(modules) {
  return modules.map(module => {
    return {
      name: undefined,
      require: [],
      configure: [],
      define: [],
      extend: [],
      initialize: function() {},
      ...module,
    }
  })
}

function validateModules(modules) {
  const settings = {}
  const definitions = {}

  for (const module of modules) {
    for (const setting of module.configure) {
      const dModule = settings[setting]
      if (dModule) return new Error(`The ${setting} configuration setting is already defined in the ${dModule.name} module.`)
      else settings[setting] = module
    }

    for (const definition of module.define) {
      const dModules = definitions[definition]
      if (dModules) return new Error(`${definition} is already defined in the ${dModules[0].name} module.`)
      else definitions[definition] = [module]
    }

    for (const extension of module.extend) {
      const dModules = definitions[extension]
      if (!dModules) return new Error(`Tried to extend ${extension} but it is undefined.`)
      else dModules.push(module)
    }
  }

  return modules
}

function validateModuleConfiguration(arg) {
  const { modules, configuration } = arg
  const definedConfiguration = new Set(['modules'])

  for (const module of modules) {
    for (const setting of module.configure) {
      definedConfiguration.add(setting)
    }
  }

  for (const setting in configuration) {
    if (!definedConfiguration.has(setting)) return new Error(`Unrecognized configuration setting ${setting}.`)
  }

  return arg
}

function initializeModules(arg) {
  const { modules, configuration, library } = arg
  for (const module of modules) {
    try {
      module.initialize(library, configuration)
    } catch(error) { return error }
  }
}