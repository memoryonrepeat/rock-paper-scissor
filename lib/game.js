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
          this.stopped = true
          console.log(this.human.getScore())
          console.log(this.computer.getScore())
          this.stop()
        } else {
          this.human.makeMove(choice)
          this.computer.makeMove()
          this.judge()
          this.startGen.next()
        }
      })
    }
  }
  judge () {
    if (this.human.move === this.computer.move) {
      console.log('draw')
      return
    }
    if (this.weapons[this.human.move].wins.includes(this.computer.move)) {
      return this.human.wins()
    }
    this.computer.wins()
  }
  stop () {
    console.log('Game ended')
    rl.close()
  }
}

module.exports = new Game()
