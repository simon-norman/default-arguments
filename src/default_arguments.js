
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
  const overridenDefaults = argsWithDefaults
  for (let i = 0; i < passedArgs.length; i += 1) {
    if (passedArgs[i]) {
      overridenDefaults[i] = passedArgs[i]
    }
  }

  return overridenDefaults
}

const setFunctionWithDefaults = function (functionToSetDefaults, argsWithDefaults) {
  function functionWithDefaults() {
    const overridenDefaults = overrideDefaultsWithPassedArgs(argsWithDefaults, arguments)
    return functionToSetDefaults(...overridenDefaults)
  }

  functionWithDefaults.originalFunction = functionToSetDefaults
  return functionWithDefaults
}

module.exports = function defaultArgs(functionToDefault, defaults) {
  functionToDefault = getOriginalFunctionIfDefaultArgsCalledRepeatedly(functionToDefault)

  const functionArgs = argsFromFunction(functionToDefault)

  const argsWithDefaults = setDefaultsToArgs(defaults, functionArgs)

  const functionWithDefaults = setFunctionWithDefaults(functionToDefault, argsWithDefaults)

  functionWithDefaults.functionArgs = functionArgs

  return functionWithDefaults
}
