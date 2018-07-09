'use strict'

const config = require('./config')
const readline = require('readline')
const HumanPlayer = require('./player').HumanPlayer
const ComputerPlayer = require('./player').ComputerPlayer

class Game {
  constructor () {
    this.players = []
    this.weapons = config.weapons
  }
  start () {
    // Only run game with valid weapons
    if (!this.validateWeapons()) {
      return
    }
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.readGenerator = this.read()
    this.readGenerator.next()
  }
  // Generator to yield questions
  * read () {
    yield this.rl.question('Please enter your name: ', (name) => {
      this.handleInit(name)
    })

    // Keep generating prompts until receiving stop signal
    while (this.choice !== 'q') {
      console.log(config.help)
      yield this.rl.question('Please enter your choice: ', (choice) => {
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
    // In case moves are the same, return early to save computation
    if (opponent1.move === opponent2.move) {
      return console.log(`${opponent1.name} draws ${opponent2.name}`)
    }
    // In case weapons are not strictly defined, both opponents may have no effect on each other so have to check on both sides
    if (config.weapons[opponent1.move].wins.includes(opponent2.move)) {
      return opponent1.wins()
    }
    // In case weapons are not strictly defined, both opponents may have no effect on each other so have to check on both sides
    if (config.weapons[opponent2.move].wins.includes(opponent1.move)) {
      return opponent2.wins()
    }
    // In case weapons are not strictly defined, some weapons can have no effect to each other -> draw
    return console.log(`${opponent1.name} draws ${opponent2.name}`)
  }
  handleChoice () {
    switch (this.choice) {
      case 'q':
        this.handleStop()
        break
      case 'c':
        this.handleComputerVsComputer()
        break
      default:
        if (config.weapons[config.mappings[this.choice]]) {
          this.choice = config.mappings[this.choice]
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
      console.log(`Player: ${player.name} || Score: ${player.getScore()}`)
    })
    this.readGenerator.return()
    this.choice = null
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
  // See if any consistency i.e both weapons wins against each other
  validateWeapons () {
    for (let currentId in config.weapons) {
      for (let inferiorId of config.weapons[currentId].wins) {
        if (config.weapons[inferiorId].wins.includes(parseInt(currentId))) {
          console.log(`Detected inconsistency between ${config.weapons[currentId].name} and ${config.weapons[inferiorId].name}. Please fix and try again.`)
          return false
        }
      }
    }
    console.log('No weapons conflict found. Game ready to start.')
    return true
  }
  reset () {
    if (this.rl) {
      this.rl.close()
    }
    this.human = null
    this.computer = null
    this.computer2 = null
    this.players = []
    this.choice = null
  }
}

module.exports = Game
