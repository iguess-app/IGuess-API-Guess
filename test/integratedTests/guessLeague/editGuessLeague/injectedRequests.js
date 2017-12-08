'use strict'

const happyPathRequest = {
  method: 'PATCH',
  url: '/guessleague/editGuessLeague',
  headers: {
    token: '59b54e44a7631d433470fee7'
  },
  payload: {
    'guessLeagueRef': '59c0730fe102884c5cb6ba79',
    'newName': 'SET DYNAMICALLY'
  }
}

const notFound = {
  method: 'PATCH',
  url: '/guessleague/editGuessLeague',
  headers: {
    token: '59b54e44a7631d433470fee9'
  },
  payload: {
    'guessLeagueRef': '5a2756430a3d182004c7dcce',
    'newName': 'whatever'
  }
}

module.exports = {
  happyPathRequest,
  notFound
}