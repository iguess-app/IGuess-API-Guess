'use strict'

const happyPathRequest = {
  method: 'PATCH',
  url: '/guessleague/quitCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'userRef': '591e5c05a8634f1f9880e8ae'
  }
}

 const noGuessLeagueFound = {
  method: 'PATCH',
  url: '/guessleague/quitCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a355',
    'userRef': '591e5c05a8634f1f9880e8ae'
  }
}

const noUserFoundAtGuessLeague = {
  method: 'PATCH',
  url: '/guessleague/quitCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'userRef': '591e5c05a8634f1f9880e888'
  }
}

module.exports = {
  happyPathRequest,
  noGuessLeagueFound,
  noUserFoundAtGuessLeague
}