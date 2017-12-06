'use strict'

const happyPathResponseYesRequest = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  },
  headers: {
    token: '591e5ccca8634f1f9880e8ca'
  }
}

const happyPathResponseNotRequest = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': false
  },
  headers: {
    token: '591e5cdaa8634f1f9880e8cc'
  }
}

const notAtGuessLine = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  },
  headers: {
    token: '591e5c36a8634f1f9880e8b8'
  }
}

const userNotAtInviteadsList = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  },
  headers: {
    token: '591e5c21a8634f1f9880e8b4'
  }
}

const userAlreadyAtPlayersList = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  },
  headers: {
    token: '59b54e44a7631d433470fee7'
  }
}

const guessLeagueNotFound = {
  method: 'PATCH',
  url: '/guessleague/inviteResponse',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e28984444',
    'championshipRef': '5872a8d2ed1b02314e088291',
    'response': true
  },
  headers: {
    token: '591e5ccca8634f1f9880e8ca'
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