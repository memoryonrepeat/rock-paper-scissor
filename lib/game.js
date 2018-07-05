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
    this.weapons = config.weapons
  }
  createHumanPlayer () {
    rl.question('Please enter your name: ', (name) => {
      this.human = new HumanPlayer(name)
      this.computer = new ComputerPlayer()
      this.stop()
    })
  }
  start () {
    this.createHumanPlayer()
  }
  stop () {
    console.log('Game ended')
    rl.close()
  }
}

module.exports = new Game()
