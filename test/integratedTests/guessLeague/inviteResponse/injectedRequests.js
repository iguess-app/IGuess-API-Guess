'use strict'

const happyPathResponseYesRequest = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'userRef': '591e5ccca8634f1f9880e8ca',
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  }
}

const happyPathResponseNotRequest = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'userRef': '591e5cdaa8634f1f9880e8cc',
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': false
  }
}

const notAtGuessLine = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'userRef': '591e5c36a8634f1f9880e8b8',
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  }
}

const userNotAtInviteadsList = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'userRef': '591e5c21a8634f1f9880e8b4',
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  }
}

const userAlreadyAtPlayersList = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'userRef': '59b54e44a7631d433470fee7',
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  }
}

const guessLeagueNotFound = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'userRef': '591e5ccca8634f1f9880e8ca',
    'guessLeagueRef': '59c05e253feecf1e28984444',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  }
}

module.exports = {
  happyPathResponseYesRequest,
  happyPathResponseNotRequest,
  notAtGuessLine,
  userNotAtInviteadsList,
  userAlreadyAtPlayersList,
  guessLeagueNotFound
}