
const getOriginalFunctionIfDefaultArgsCalledRepeatedly = (functionToSetDefaults) => {
  if (functionToSetDefaults.originalFunction) {
    return functionToSetDefaults.originalFunction
  }
  return functionToSetDefaults
}

const argsFromFunction = (functionToParse) => {
  const functionAsString = functionToParse.toString()
  const argNames = functionAsString.match(/\((.*)\)/)[1]
  const functionArgs = argNames.split(',')

  return functionArgs
}

const setDefaultsToArgs = (defaults, functionArgs) => {
  const argsWithDefaults = []
  functionArgs.forEach((argName) => {
    argsWithDefaults.push(defaults[argName.trim()])
  })

  return argsWithDefaults
}

const overrideDefaultsWithPassedArgs = (argsWithDefaults, passedArgs) => {
  const overriddenDefaults = argsWithDefaults

  for (let i = 0; i < passedArgs.length; i += 1) {
    if (passedArgs[i]) {
      overriddenDefaults[i] = passedArgs[i]
    }
  }

  return overriddenDefaults
}

const setFunctionWithDefaults = function (functionToSetDefaults, argsWithDefaults) {
  function functionWithDefaults() {
    const overriddenDefaults = overrideDefaultsWithPassedArgs(argsWithDefaults, arguments)
    return functionToSetDefaults(...overriddenDefaults)
  }

  functionWithDefaults.originalFunction = functionToSetDefaults
  return functionWithDefaults
}

module.exports = function defaultArgs(functionToDefault, defaults) {
  functionToDefault = getOriginalFunctionIfDefaultArgsCalledRepeatedly(functionToDefault)

  const functionArgs = argsFromFunction(functionToDefault)

  const argsWithDefaults = setDefaultsToArgs(defaults, functionArgs)

  const functionWithDefaults = setFunctionWithDefaults(functionToDefault, argsWithDefaults)

  return functionWithDefaults
}
