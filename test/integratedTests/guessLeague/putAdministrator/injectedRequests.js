'use strict'

const happyPathRequest = {
  method: 'PATCH',
  url: '/guessleague/putCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'userRef': '59b54e44a7631d433470fee7',
    'userRefToAdm': '5932d84626fee5502cb422d6'
  }
}

const userInvitedIsAlreadyAdm = {
  method: 'PATCH',
  url: '/guessleague/putCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'userRef': '59b54e44a7631d433470fee7',
    'userRefToAdm': '591df6c78d1fdc0bb4eba371'
  }
}

const userRefEqualUserRefToAdm = {
  method: 'PATCH',
  url: '/guessleague/putCaptain',
  payload: {
    'guessLeagueRef': '59c05e253feecf1e2898a3fb',
    'userRef': '59b54e44a7631d433470fee7',
    'userRefToAdm': '59b54e44a7631d433470fee7'
  }
}

module.exports = {
  happyPathRequest,
  userInvitedIsAlreadyAdm,
  userRefEqualUserRefToAdm
}