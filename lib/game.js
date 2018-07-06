'use strict'

const config = require('./config')
const readline = require('readline')
const HumanPlayer = require('./player').HumanPlayer
const ComputerPlayer = require('./player').ComputerPlayer

class Game {
  constructor () {
    this.players = []
    this.weapons = config.weapons
    this.readGenerator = this.read()
  }
  start () {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.readGenerator.next()
  }
  * read () {
    yield this.rl.question('Please enter your name: ', (name) => {
      this.handleInit(name)
    })

    while (this.choice !== 'stop') {
      yield this.rl.question('\nPlease enter your choice: ', (choice) => {
        this.choice = choice.trim().toLowerCase()
        this.handleChoice()
      })
    }
  }
  handleInit (name) {
    this.human = new HumanPlayer(name)
    this.computer = new ComputerPlayer()
    this.players.push(this.human)
    this.players.push(this.computer)
    this.readGenerator.next()
  }
  judge (opponent1, opponent2) {
    if (opponent1.move === opponent2.move) {
      console.log(`${opponent1.name} draws ${opponent2.name}`)
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
    console.log('\n-------GAME FINISHED-------\n-------PLAYER SCORES-------')
    this.players.forEach((player) => {
      console.log(`Player: ${player.name} || Score: ${player.score}`)
    })
    this.rl.close()
  }
  handleComputerVsComputer () {
    if (!this.computer2) {
      this.computer2 = new ComputerPlayer()
      this.players.push(this.computer2)
    }
    this.computer2.makeMove()
    this.computer.makeMove()
    this.judge(this.computer, this.computer2)
    this.readGenerator.next()
  }
  handleHumanVsComputer () {
    this.human.makeMove(this.choice)
    this.computer.makeMove()
    this.judge(this.human, this.computer)
    this.readGenerator.next()
  }
  handleInvalidChoice () {
    console.log('Choice is invalid. Please try again')
    this.readGenerator.next()
  }
}

module.exports = new Game()
