const expect = require('chai').expect
const HumanPlayer = require('../lib/player').HumanPlayer
const ComputerPlayer = require('../lib/player').ComputerPlayer
const Player = require('../lib/player').Player
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
      game.rl.write('thanh\n')
      game.rl.write('0\n')
      game.rl.write('   1\n')
      game.rl.write('2   \n')
      game.rl.write('  0  \n')
      game.rl.write('  a0b  \n')
      game.rl.write('1\n')
      game.rl.write('2\n')
      game.rl.write('invalid\n')
      game.rl.write('computer\n')
      game.rl.write('COMPUTER\n')
      game.rl.write('  ComPuTeR  \n')
      game.rl.write('computer\n')
      game.rl.write('computer\n')
      game.rl.write('computer\n')
      game.rl.write('stop\n')
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
})
