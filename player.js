class Player {
  constructor (name) {
    this.name = name
    this.score = 0
  }

  getScore () {
    return this.score
  }

  increaseScore () {
    this.score++
  }
}

class HumanPlayer extends Player {
  makeMove () {

  }
}

class ComputerPlayer extends Player {
  constructor () {
    super('AI-' + [...Array(5)].map(() => Math.random().toString(36)[2]).join(''))
  }
  makeMove () {

  }
}

exports.HumanPlayer = HumanPlayer
exports.ComputerPlayer = ComputerPlayer
