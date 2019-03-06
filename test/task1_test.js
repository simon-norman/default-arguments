const defaultArguments = require('./../src/default_arguments')
const { expect } = require('chai')

describe('defaultArguments', function () {
  let add
  let add2
  let add3
  
  describe('when defaultArguments called with a function, specifying default for one of the function args', function () {
    beforeEach(() => {
      add = function (a, b) {
        return a + b
      }

      add2 = defaultArguments(add, { b: 9 })
    })

    it('should return function that, when called with one arg, applies default for other arg', function () {
      expect(add2(10)).equals(19)
    })

    it('should return function that, when called with two args, does not apply default', function () {
      expect(add2(10, 7)).equals(17)
    })

    it('should return function that, when called with no args, returns NaN as only one of the args has default', function () {
      expect(isNaN(add2())).equals(true)
    })
  })

  describe('when defaultArguments called again with function returned by previous call and new defaults', function () {
    beforeEach(() => {
      add = function (a, b) {
        return a + b
      }

      add2 = defaultArguments(add, { b: 9 })

      add3 = defaultArguments(add2, { b: 3, a: 2 })
    })

    it('should return function that, when called with one arg, applies default to arg not passed', function () {
      expect(add3(10)).equals(13)
    })

    it('should return function that, when called with no args, applies new defaults', function () {
      expect(add3()).equals(5)
    })

    it('should return function that, when called with undefined as arg, applies defaults', function () {
      expect(add3(undefined, 10)).equals(12)
    })
  })

  describe('when defaultArguments called a third time with function returned by previous call, but without new defaults', function () {
    let add4

    beforeEach(() => {
      add = function (a, b) {
        return a + b
      }

      add2 = defaultArguments(add, { b: 9 })

      add3 = defaultArguments(add2, { b: 3, a: 2 })

      add4 = defaultArguments(add3, { c: 3 })
    })

    it('should return function that, when called with one arg, applies default to arg not passed', function () {
      expect(isNaN(add4(10))).equals(true)
    })

    it('should return function that, when called with no args, applies new defaults', function () {
      expect(add4(10, 10)).equals(20)
    })
  })
})
