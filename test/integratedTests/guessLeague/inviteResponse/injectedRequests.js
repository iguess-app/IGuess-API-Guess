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
    'userRef': '591e5ccca8634f1f9880e8ca',
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

const userNotAtInviteadsList = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'userRef': '591e5ccca8634f1f9880e8ca',
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

const userAlreadyAtPlayersList = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'userRef': '591e5ccca8634f1f9880e8ca',
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
  }
}

const guessLeagueNotFound = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'userRef': '591df6c78d1fdc0bb4eba666',
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291'
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