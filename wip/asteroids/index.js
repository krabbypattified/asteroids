export default class Game {
  constructor(configuration) {
    if (!configuration || !configuration.modules) throw new Error(`Invalid configuration object.`)

    const modules = right(configuration.modules).map(resolveModules).map(validateModules).value
    if (modules instanceof Error) throw modules

    const result = right({ modules, configuration }).map(validateModuleConfiguration).map(initializeModules).value
    if (result instanceof Error) throw result
  }
}

function left(value) {
  return new class Left {
    value = value
    map() {
      return this
    }
  }
}

function right(value) {
  return new class Right {
    value = value
    map(function_) {
      const return_ = function_(this.value)
      if (return_ instanceof Error) return left(return_)
      else return right(return_)
    }
  }
}

function resolveModules(modules, path = []) {
  let resolved = new Set()

  for (const module_ of modules) {
    const nModule = normalizeModule(module_)
    if (nModule instanceof Error) return nModule

    const circular = path.indexOf(nModule.name)
    const nextPath = [...path, nModule.name]
    if (circular) return new Error(`Circular dependency: ${nextPath.join(' - ')}`)

    if (nModule.require.length) resolved = new Set([...resolved, ...resolveModules(nModule.require, nextPath)])
    resolved.add(module_)
  }

  return resolved
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

function validateModuleConfiguration({ modules, configuration }) {
  const definedConfiguration = new Set()

  for (const module_ of modules) {
    for (const setting of module_.defineConfiguration) {
      definedConfiguration.add(setting)
    }
  }

  for (const setting of configuration) {
    if (!definedConfiguration.has(setting)) return new Error(`Unrecognized configuration setting ${setting}.`)
  }

  return { modules, configuration }
}

function initializeModules({ modules, configuration }) {
  for (const module_ of modules) {
    try {
      const error = module_.initialize(configuration)
      if (error) return error
    } catch(error) { return error }
  }
}