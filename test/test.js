const expect = require('chai').expect
const HumanPlayer = require('../lib/player').HumanPlayer
const ComputerPlayer = require('../lib/player').ComputerPlayer

let human = new HumanPlayer('test_human')
let computer1 = new ComputerPlayer()

describe('Player', () => {
  describe('#constructor()', () => {
    it('human should be an object with class of HumanPlayer', () => {
      expect(human.constructor.name).to.be.equal('HumanPlayer')
    })
    it('human should be an object with parent class of Player', () => {
      expect(Object.getPrototypeOf(human.constructor).name).to.be.equal('Player')
    })
    it('computer1 should be an object with class of ComputerPlayer', () => {
      expect(computer1.constructor.name).to.be.equal('ComputerPlayer')
    })
    it('computer1 should be an object with parent class of Player', () => {
      expect(Object.getPrototypeOf(computer1.constructor).name).to.be.equal('Player')
    })
  })
})
