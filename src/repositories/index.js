'use strict'

const guessLeagues = require('./guessLeagues')
const guessLines = require('./guessLines')
const holi = require('./holi')

module.exports = Object.assign(guessLeagues, guessLines, holi)