'use strict'

const weapons = {
  0: {
    name: 'rock',
    wins: [2] // List of weapons that will lose to the current weapon
  },
  1: {
    name: 'paper',
    wins: [0]
  },
  2: {
    name: 'scissor',
    wins: [1]
  }
}

// Key mappings for weapons
const mappings = {
  'r': 0,
  'p': 1,
  's': 2
}

const help = '\n' + Object.keys(mappings).map((k, v) => {
  return `(${k}) for ${weapons[v].name}. `
}).join('') + '(q) for quit. (c) for computer vs computer.'

exports.weapons = weapons
exports.mappings = mappings
exports.help = help
