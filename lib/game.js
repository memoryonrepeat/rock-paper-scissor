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
    rl.question('Please enter your name: ', (name) => {
      this.human = new HumanPlayer(name)
      this.computer = new ComputerPlayer()
      this.start()
    })
  }
  start () {
    rl.question('Please enter your choice: ', (choice) => {
      if (choice === 'stop') {
        this.stop()
      } else {
        this.start()
      }
    })
  }
  stop () {
    console.log('Game ended')
    rl.close()
  }
}

module.exports = new Game()
