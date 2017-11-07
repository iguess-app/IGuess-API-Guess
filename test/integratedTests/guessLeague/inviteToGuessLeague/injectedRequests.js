'use strict'

const happyPathRequest = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRef': '59b54e44a7631d433470fee7',
    'userRefInviteads': ['591e5c3fa8634f1f9880e8ba'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

const notAtGuessLine = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRef': '59b54e44a7631d433470fee7',
    'userRefInviteads': ['591e5c36a8634f1f9880e8b8'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

const alreadyAdd = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRef': '59b54e44a7631d433470fee7',
    'userRefInviteads': ['591e5bbba8634f1f9880e8aa'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

const notCaptainTryToAdd = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRef': '591e5bbba8634f1f9880e8aa',
    'userRefInviteads': ['591e5c63a8634f1f9880e8c0'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

const alreadyAtInviteadList = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRef': '59b54e44a7631d433470fee7',
    'userRefInviteads': ['591e5c98a8634f1f9880e8c4'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

const duplicatedInviteadsList = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague',
  payload: {
    'userRef': '59b54e44a7631d433470fee7',
    'userRefInviteads': ['591e5c3fa8634f1f9880e8ba', '591e5c3fa8634f1f9880e8ba'],
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

module.exports = {
  happyPathRequest,
  notAtGuessLine,
  alreadyAdd,
  notCaptainTryToAdd,
  duplicatedInviteadsList,
  alreadyAtInviteadList
}