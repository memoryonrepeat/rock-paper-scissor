'use strict'

const config = require('config')

class Game {
  constructor () {
    this.weapons = config.weapons
  }
}

exports.Game = Game
