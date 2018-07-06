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
    this.stopped = false
    this.weapons = config.weapons
    this.stopped = false
    this.startGen = this.start()
    this.startGen.next()
  }
  * start () {
    yield rl.question('Please enter your name: ', (name) => {
      this.human = new HumanPlayer(name)
      this.computer = new ComputerPlayer()
      this.startGen.next()
    })

    while (!this.stopped) {
      yield rl.question('Please enter your choice: ', (choice) => {
        if (choice === 'stop') {
          this.handleStop()
        } else if (choice === 'computer') {
          this.handleComputerVsComputer()
        } else {
          this.handleHumanVsComputer(choice)
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
    this.stopped = true
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
  handleHumanVsComputer (choice) {
    this.human.makeMove(choice)
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
