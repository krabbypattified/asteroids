/**
 * This is the entry point for Asteroids.
 * It is nothing more than a module resolver.
 * The modules themselves are responsible for implementing the library.
 */

export default class Game {
  constructor(configuration) {
    const validated = validateConfiguration(configuration)
    if (validated instanceof Error) return console.error(validated)

    const modules = right(configuration.modules).map(resolveModules).map(validateModules).value
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

function resolveModules(modules, path = []) {
  let resolvedModules = new Set()

  for (const module_ of modules) {
    const nModule = normalizeModule(module_)
    if (nModule instanceof Error) return nModule

    const circular = path.indexOf(nModule.name) >= 0
    const nextPath = [...path, nModule.name]
    if (circular) return new Error(`Circular dependency: ${nextPath.join(' - ')}`)

    if (nModule.require.length) {
      const subModules = resolveModules(nModule.require, nextPath)
      if (subModules instanceof Error) return subModules
      resolvedModules = new Set([...resolvedModules, ...subModules])
    }

    resolvedModules.add(nModule)
  }

  return resolvedModules
}

function normalizeModule(module_) {
  if (!module_) return new Error(`Found an undefined module.`)
  if (!module_.name) return new Error(`Found a module with no name.`)
  return {
    name: undefined,
    require: [],
    defineConfiguration: [],
    define: [],
    extend: [],
    initialize: function() {},
    ...module_,
  }
}

function validateModules(modules) {
  const settings = {}
  const definitions = {}

  for (const module_ of modules) {
    for (const setting of module_.defineConfiguration) {
      const dModule = settings[setting]
      if (dModule) return new Error(`The ${setting} configuration setting is already defined in the ${dModule.name} module.`)
      else settings[setting] = module_
    }

    for (const definition of module_.define) {
      const dModules = definitions[definition]
      if (dModules) return new Error(`${definition} is already defined in the ${dModules[0].name} module.`)
      else definitions[definition] = [module_]
    }

    for (const extension of module_.extend) {
      const dModules = definitions[extension]
      if (!dModules) return new Error(`Tried to extend ${extension} but it is undefined.`)
      else dModules.push(module_)
    }
  }

  return modules
}

function validateModuleConfiguration(arg) {
  const { modules, configuration } = arg
  const definedConfiguration = new Set(['modules'])

  for (const module_ of modules) {
    for (const setting of module_.defineConfiguration) {
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
  for (const module_ of modules) {
    try {
      const error = module_.initialize(library, configuration)
      if (error) return error
    } catch(error) { return error }
  }
}