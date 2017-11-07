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

const anyGuessLeagueFound = {
  method: 'PATCH',
  url: '/guessleague/inviteToGuessLeague'
}

//Not at guessLine

//Already add

//Not captain try to add

//Already at invitead list

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
  anyGuessLeagueFound,
  duplicatedInviteadsList
}