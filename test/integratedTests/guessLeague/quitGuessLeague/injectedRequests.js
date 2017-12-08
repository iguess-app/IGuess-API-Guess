'use strict'

const happyPathRequest = {
  method: 'PATCH',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '59bddedee7c8a12658c0c08c'
  }
}

const guessLeagueRefnotFound = {
  method: 'PATCH',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3f9'
  },
  headers: {
    token: '59bddedee7c8a12658c0c08c'
  }
}

const userRefIsNotAtGuessLeague = {
  method: 'PATCH',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '59bddedee7c8a12658c0c085'
  }
}

const admCantQuit = {
  method: 'PATCH',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb'
  },
  headers: {
    token: '59b54e44a7631d433470fee7'
  }
}

const createGuessLeague = {
  method: 'POST',
  url: '/guessleague/createGuessLeague',
  payload: {
    'guessLeagueName': 'Last player to quit test',
    'championshipRef': '5872a8d2ed1b02314e088291',

    'userRefInviteads': []
  },
  headers: {
    'token': '59b54e44a7631d433470fee7'
  }
}

const lastPlayerToQuit = {
  method: 'PATCH',
  url: '/guessleague/quitGuessLeague',
  payload: {
    'guessLeagueRef': 'SET DYNAMICALLY'
  },
  headers: {
    'token': '59b54e44a7631d433470fee7'
  }
}

module.exports = {
  happyPathRequest,
  guessLeagueRefnotFound,
  userRefIsNotAtGuessLeague,
  admCantQuit,
  createGuessLeague,
  lastPlayerToQuit
}