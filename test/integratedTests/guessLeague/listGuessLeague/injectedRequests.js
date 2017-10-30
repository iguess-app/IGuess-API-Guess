'use strict'

const happyPathRequest = {
  method: 'GET',
  url: '/guessleague/listGuessesLeagues?userRef=59b54e44a7631d433470fee7'
}

const anyGuessLeagueFound = {
  method: 'GET',
  url: '/guessleague/listGuessesLeagues?userRef=59b54e44a7631d433470fee9'
}

module.exports = {
  happyPathRequest,
  anyGuessLeagueFound
}