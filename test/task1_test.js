const defaultArguments = require('./../src/default_arguments')
const { expect } = require('chai')

describe('defaultArguments', function () {
  it('should return function with default arguments set as specified', function () {
    function add(a, b) {
      return a + b
    }

    const add2 = defaultArguments(add, { b: 9 })

    expect(add2(10)).equals(19)
  })
})
