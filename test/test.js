const expect = require('chai').expect
const HumanPlayer = require('../lib/player').HumanPlayer
const ComputerPlayer = require('../lib/player').ComputerPlayer
const Player = require('../lib/player').Player
const stdin = require('mock-stdin').stdin()
let Game = require('../lib/game')

let human = new HumanPlayer('test_human')
let computer1 = new ComputerPlayer()
let game = new Game()

describe('Player', () => {
  describe('#constructor()', () => {
    it('human should be an instance of HumanPlayer', () => {
      expect(human).to.be.an.instanceof(HumanPlayer)
    })
    it('human should be a child instance of Player', () => {
      expect(Object.getPrototypeOf(human)).to.be.an.instanceof(Player)
    })
    it('computer1 should be an instance of ComputerPlayer', () => {
      expect(computer1).to.be.an.instanceof(ComputerPlayer)
    })
    it('computer1 should be a child instance of Player', () => {
      expect(Object.getPrototypeOf(computer1)).to.be.an.instanceof(Player)
    })
    it('player instances should has a name and initial score', () => {
      expect(human.name).to.be.equal('test_human')
      expect(human.score).to.be.equal(0)
      expect(computer1.name).to.be.a('string')
      expect(computer1.score).to.be.equal(0)
    })
  })
})

describe('Game', () => {
  describe('#constructor()', () => {
    it('game should be an instance of Game ', () => {
      expect(game).to.be.an.instanceof(Game)
    })
  })
})
