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
    this.choice = null
    this.weapons = config.weapons
    this.startGen = this.start()
    this.startGen.next()
  }
  * start () {
    yield rl.question('Please enter your name: ', (name) => {
      this.human = new HumanPlayer(name)
      this.computer = new ComputerPlayer()
      this.startGen.next()
    })

    while (this.choice !== 'stop') {
      yield rl.question('Please enter your choice: ', (choice) => {
        this.choice = choice
        if (this.choice === 'stop') {
          this.handleStop()
        } else if (this.choice === 'computer') {
          this.handleComputerVsComputer()
        } else {
          this.handleHumanVsComputer()
        }
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
  handleStop () {
    console.log(this.human.getScore())
    console.log(this.computer.getScore())
    if (this.computer2) {
      console.log(this.computer2.getScore())
    }
    this.stop()
  }
  handleComputerVsComputer () {
    if (!this.computer2) {
      this.computer2 = new ComputerPlayer()
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
  stop () {
    console.log('Game ended')
    rl.close()
  }
}

module.exports = new Game()
