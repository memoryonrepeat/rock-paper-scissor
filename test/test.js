const expect = require('chai').expect
const HumanPlayer = require('../lib/player').HumanPlayer
const ComputerPlayer = require('../lib/player').ComputerPlayer
const Player = require('../lib/player').Player
const config = require('../lib/config')
let Game = require('../lib/game')

let human = new HumanPlayer('test_human')
let human2 = new HumanPlayer('test_human2')
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
  beforeEach(() => {
    game.reset()
  })
  describe('#constructor()', () => {
    it('game should be an instance of Game', () => {
      expect(game).to.be.an.instanceof(Game)
    })
  })
  describe('#start()', () => {
    it('game should initiate players', (done) => {
      game.start()
      game.rl.on('close', () => {
        expect(game.human).to.be.an.instanceof(HumanPlayer)
        expect(game.computer).to.be.an.instanceof(ComputerPlayer)
        expect(game.computer2).to.be.an.instanceof(ComputerPlayer)
        done()
      })
      game.rl.write('alphago\n')
      game.rl.write('r\n')
      game.rl.write('   p\n')
      game.rl.write('s   \n')
      game.rl.write('  r  \n')
      game.rl.write('  0p1  \n')
      game.rl.write('s\n')
      game.rl.write('s\n')
      game.rl.write('invalid\n')
      game.rl.write('c\n')
      game.rl.write('C\n')
      game.rl.write('  ComPuTeR  \n')
      game.rl.write('q\n')
    })
  })
  describe('#judge()', () => {
    it('game should be judged correctly', () => {
      human.resetScore()
      human2.resetScore()
      human.makeMove(0)
      human2.makeMove(1)
      game.judge(human, human2)
      expect(human.score).to.be.lessThan(human2.score)
      human.makeMove(2)
      human2.makeMove(1)
      game.judge(human, human2)
      expect(human.score).to.be.equal(human2.score)
      human.makeMove(1)
      human2.makeMove(1)
      game.judge(human, human2)
      expect(human.score).to.be.equal(human2.score)
      human.makeMove(1)
      human2.makeMove(2)
      game.judge(human, human2)
      expect(human.score).to.be.lessThan(human2.score)
    })
  })
  describe('#validateWeapons()', () => {
    it('weapons should be validated correctly', (done) => {
      expect(game.validateWeapons()).to.be.equal(true)
      config.weapons[2].wins = [0]
      game.start()
      expect(game.validateWeapons()).to.be.equal(false)
      config.weapons[2].wins = []
      config.weapons[1].wins = []
      config.weapons[0].wins = []
      game.start()
      game.rl.on('close', () => {
        expect(game.human.score).to.be.an.equal(0)
        expect(game.computer.score).to.be.equal(0)
        config.weapons[2].wins = [1]
        config.weapons[1].wins = [0]
        config.weapons[0].wins = [2]
        expect(game.validateWeapons()).to.be.equal(true)
        done()
      })
      game.rl.write('alphago\n')
      game.rl.write('r\n')
      game.rl.write('p\n')
      game.rl.write('s\n')
      game.rl.write('q\n')
    })
  })
})
