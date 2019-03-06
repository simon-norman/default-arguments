
module.exports = function defaultArguments(functionToSetDefaults, defaults) {
  const functionAsString = functionToSetDefaults.toString()
  const argumentNames = functionAsString.match(/\((.*)\)/)[1]
  const argumentsAsArray = argumentNames.split(',')

  const functionArguments = []
  argumentsAsArray.forEach((argumentName) => {
    functionArguments.push(defaults[argumentName.trim()])
  })

  function functionWithDefaults() {
    for (let i = 0; i < arguments.length; i += 1) {
      functionArguments[i] = arguments[i]
    }

    return functionToSetDefaults.apply(this, functionArguments)
  }

  return functionWithDefaults
}
