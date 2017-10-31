'use strict'

const happyPathRequest = {
  method: 'PATCH',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'userRef': '59bddedee7c8a12658c0c08c'
  }
}

const guessLeagueRefnotFound = {
  method: 'PATCH',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3f9',
    'userRef': '59bddedee7c8a12658c0c08c'
  }
}

const userRefIsNotAtGuessLeague = {
  method: 'PATCH',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'userRef': '59bddedee7c8a12658c0c085'
  }
}

const admCantQuit = {
  method: 'PATCH',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'userRef': '59b54e44a7631d433470fee7'
  }
}

module.exports = {
  happyPathRequest,
  guessLeagueRefnotFound,
  userRefIsNotAtGuessLeague,
  admCantQuit
}