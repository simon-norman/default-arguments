
const argsFromFunction = (functionToParse) => {
  const functionAsString = functionToParse.toString()
  const argNames = functionAsString.match(/\((.*)\)/)[1]
  return argNames.split(',')
}

const setDefaultsToArgs = (defaults, functionArgs) => {
  const argsWithDefaults = []
  functionArgs.forEach((argName) => {
    argsWithDefaults.push(defaults[argName.trim()])
  })

  return argsWithDefaults
}

const setFunctionWithDefaults = (functionToSetDefaults, argsWithDefaults) => {
  function functionWithDefaults() {
    for (let i = 0; i < arguments.length; i += 1) {
      argsWithDefaults[i] = arguments[i]
    }

    return functionToSetDefaults.apply(this, argsWithDefaults)
  }

  return functionWithDefaults
}

module.exports = function defaultArgs(functionToSetDefaults, defaults) {
  const functionArgs = argsFromFunction(functionToSetDefaults)

  const argsWithDefaults = setDefaultsToArgs(defaults, functionArgs)

  return setFunctionWithDefaults(functionToSetDefaults, argsWithDefaults)
}
