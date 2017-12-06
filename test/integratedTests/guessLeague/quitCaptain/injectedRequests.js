'use strict'

const happyPathRequest = {
  method: 'DELETE',
  url: '/guessleague/quitCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '591e5c05a8634f1f9880e8ae'
  }
}

 const noGuessLeagueFound = {
  method: 'DELETE',
  url: '/guessleague/quitCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a355'
  },
  headers: {
    token: '591e5c05a8634f1f9880e8ae'
  }
}

const noUserFoundAtGuessLeague = {
  method: 'DELETE',
  url: '/guessleague/quitCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '591e5c05a8634f1f9880e888'
  }
}

module.exports = {
  happyPathRequest,
  noGuessLeagueFound,
  noUserFoundAtGuessLeague
}