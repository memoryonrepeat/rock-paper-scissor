'use strict'

const config = require('./config')

class Player {
  constructor (name) {
    this.name = name
    this.score = 0
    console.log(`Created player ${name}`)
  }

  getScore () {
    return this.score
  }

  wins () {
    console.log(`${this.name} wins`)
    this.score++
  }

  makeMove () {
    console.log(`${this.name} move: ${config.weapons[this.move].name}`)
  }
}

class HumanPlayer extends Player {
  makeMove (move) {
    this.move = parseInt(move)
    super.makeMove()
  }
}

class ComputerPlayer extends Player {
  constructor () {
    super('AI-' + [...Array(5)].map(() => Math.random().toString(36)[2]).join(''))
  }
  makeMove () {
    this.move = Math.floor(Math.random() * Object.keys(config.weapons).length)
    super.makeMove()
  }
}

exports.HumanPlayer = HumanPlayer
exports.ComputerPlayer = ComputerPlayer
