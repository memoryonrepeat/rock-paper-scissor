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
          this.stop()
        } else {
          this.startGen.next()
        }
      })
    }
  }
  stop () {
    console.log('Game ended')
    rl.close()
  }
}

module.exports = new Game()
