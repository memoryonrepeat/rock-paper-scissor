'use strict'

const config = require('./config')
const readline = require('readline')
const HumanPlayer = require('./player').HumanPlayer
const ComputerPlayer = require('./player').ComputerPlayer

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class Game {
  constructor () {
    this.players = []
    this.weapons = config.weapons
    this.startGen = this.start()
    this.startGen.next()
  }
  * start () {
    yield rl.question('Please enter your name: ', (name) => {
      this.human = new HumanPlayer(name)
      this.computer = new ComputerPlayer()
      this.players.push(this.human)
      this.players.push(this.computer)
      this.startGen.next()
    })

    while (this.choice !== 'stop') {
      yield rl.question('Please enter your choice: ', (choice) => {
        this.choice = choice.trim().toLowerCase()
        this.handleChoice()
      })
    }
  }
  judge (opponent1, opponent2) {
    if (opponent1.move === opponent2.move) {
      console.log('draw')
      return
    }
    if (config.weapons[opponent1.move].wins.includes(opponent2.move)) {
      return opponent1.wins()
    }
    opponent2.wins()
  }
  handleChoice () {
    switch (this.choice) {
      case 'stop':
        this.handleStop()
        break
      case 'computer':
        this.handleComputerVsComputer()
        break
      default:
        if (config.weapons[parseInt(this.choice)]) {
          this.handleHumanVsComputer()
        } else {
          this.handleInvalidChoice()
        }
        break
    }
  }
  handleStop () {
    console.log('-------GAME FINISHED-------\n-------PLAYER SCORES-------')
    this.players.forEach((player) => {
      console.log(`Player: ${player.name} || Score: ${player.score}`)
    })
    rl.close()
  }
  handleComputerVsComputer () {
    if (!this.computer2) {
      this.computer2 = new ComputerPlayer()
      this.players.push(this.computer2)
    }
    this.computer2.makeMove()
    this.computer.makeMove()
    this.judge(this.computer, this.computer2)
    this.startGen.next()
  }
  handleHumanVsComputer () {
    this.human.makeMove(this.choice)
    this.computer.makeMove()
    this.judge(this.human, this.computer)
    this.startGen.next()
  }
  handleInvalidChoice () {
    console.log('Choice is invalid. Please try again')
    this.startGen.next()
  }
}

module.exports = new Game()
